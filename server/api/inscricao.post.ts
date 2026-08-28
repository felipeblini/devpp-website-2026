import nodemailer from 'nodemailer'

interface Corpo {
  nome?: string
  email?: string
  querPalestrar?: boolean
  tema?: string
  meetup?: string
  website?: string
}

/** Limite bobo em memória: 5 envios por IP a cada 10 min. Some a cada cold start — e tudo bem. */
const janela = 10 * 60 * 1000
const limite = 5
const historico = new Map<string, number[]>()

function passouDoLimite(ip: string) {
  const agora = Date.now()
  const anteriores = (historico.get(ip) ?? []).filter(t => agora - t < janela)
  anteriores.push(agora)
  historico.set(ip, anteriores)
  return anteriores.length > limite
}

const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const limpar = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()
  const corpo = await readBody<Corpo>(event)

  // armadilha de bot: se veio preenchido, finge que deu certo
  if (limpar(corpo.website, 80)) return { ok: true }

  const nome = limpar(corpo.nome, 120)
  const email = limpar(corpo.email, 160).toLowerCase()
  const tema = limpar(corpo.tema, 1200)
  const meetup = limpar(corpo.meetup, 40) || '2026-09-24'
  const querPalestrar = Boolean(corpo.querPalestrar)

  if (nome.length < 2 || !emailValido(email)) {
    throw createError({ statusCode: 400, message: 'Confere o nome e o e-mail, por favor.' })
  }

  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    || getRequestIP(event, { xForwardedFor: true })
    || 'desconhecido'

  if (passouDoLimite(ip)) {
    throw createError({ statusCode: 429, message: 'Muitas inscrições seguidas. Tenta de novo daqui a pouco.' })
  }

  const assunto = querPalestrar
    ? `[DEV-PP ${meetup}] Inscrição + proposta de palestra — ${nome}`
    : `[DEV-PP ${meetup}] Nova inscrição — ${nome}`

  const texto = [
    `Meetup:    ${meetup}`,
    `Nome:      ${nome}`,
    `E-mail:    ${email}`,
    `Palestrar: ${querPalestrar ? 'SIM' : 'não'}`,
    querPalestrar ? `Tema:\n${tema || '(não informado)'}` : '',
    '',
    `IP: ${ip}`,
    `Recebido em: ${new Date().toISOString()}`,
  ].filter(Boolean).join('\n')

  const para = cfg.inscricaoTo || 'devpporg@gmail.com'

  try {
    if (cfg.resendApiKey) {
      await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${cfg.resendApiKey}` },
        body: {
          from: cfg.inscricaoFrom || 'DEV-PP <onboarding@resend.dev>',
          to: [para],
          reply_to: email,
          subject: assunto,
          text: texto,
        },
      })
    }
    else if (cfg.smtpHost && cfg.smtpUser && cfg.smtpPass) {
      const porta = Number(cfg.smtpPort || 465)
      const transporte = nodemailer.createTransport({
        host: cfg.smtpHost,
        port: porta,
        secure: porta === 465,
        auth: { user: cfg.smtpUser, pass: cfg.smtpPass },
      })
      await transporte.sendMail({
        from: cfg.inscricaoFrom || `DEV-PP <${cfg.smtpUser}>`,
        to: para,
        replyTo: email,
        subject: assunto,
        text: texto,
      })
    }
    else {
      // Sem credencial configurada: não some com a inscrição em silêncio.
      console.warn('[inscricao] Nenhum provedor de e-mail configurado. Inscrição recebida:\n' + texto)
      throw createError({
        statusCode: 503,
        message: 'O envio automático ainda não está configurado. Manda um e-mail pra devpporg@gmail.com que a gente te inscreve na mão.',
      })
    }
  }
  catch (erro: any) {
    if (erro?.statusCode) throw erro
    console.error('[inscricao] falha ao enviar', erro)
    throw createError({ statusCode: 502, message: 'Não deu pra enviar agora. Tenta de novo em instantes.' })
  }

  return { ok: true }
})
