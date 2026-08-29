import nodemailer from 'nodemailer'

type Tipo = 'inscricao' | 'palestra' | 'ajuda'

const ASSUNTOS: Record<Tipo, (c: Record<string, string>) => string> = {
  inscricao: c => `[DEV-PP #${c.numero}] Inscrição — ${c.nome}`,
  palestra: c => `[DEV-PP] Proposta de palestra — ${c.nome}: ${c.titulo}`,
  ajuda: c => `[DEV-PP] Quer ajudar (${c.como}) — ${c.nome}`,
}

const CAMPOS: Record<Tipo, string[]> = {
  inscricao: ['meetup', 'numero'],
  palestra: ['titulo', 'formato', 'resumo'],
  ajuda: ['como', 'mensagem'],
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
  const corpo = await readBody<Record<string, unknown>>(event)

  // armadilha de bot: se veio preenchido, finge que deu certo
  if (limpar(corpo.website, 80)) return { ok: true }

  const tipo = limpar(corpo.tipo, 20) as Tipo
  if (!(tipo in ASSUNTOS)) {
    throw createError({ statusCode: 400, message: 'Tipo de mensagem inválido.' })
  }

  const nome = limpar(corpo.nome, 120)
  const email = limpar(corpo.email, 160).toLowerCase()
  if (nome.length < 2 || !emailValido(email)) {
    throw createError({ statusCode: 400, message: 'Confere o nome e o e-mail, por favor.' })
  }

  const extras: Record<string, string> = { nome, email }
  for (const campo of CAMPOS[tipo]) extras[campo] = limpar(corpo[campo], 1500)

  if (tipo === 'palestra' && extras.titulo!.length < 3) {
    throw createError({ statusCode: 400, message: 'Escreve pelo menos um título provisório.' })
  }
  if (tipo === 'ajuda' && !extras.como) {
    throw createError({ statusCode: 400, message: 'Marca ao menos uma forma de ajudar.' })
  }

  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    || getRequestIP(event, { xForwardedFor: true })
    || 'desconhecido'

  if (passouDoLimite(ip)) {
    throw createError({ statusCode: 429, message: 'Muitos envios seguidos. Tenta de novo daqui a pouco.' })
  }

  const texto = [
    `Tipo:   ${tipo}`,
    `Nome:   ${nome}`,
    `E-mail: ${email}`,
    ...CAMPOS[tipo].map(c => `${c}:\n${extras[c] || '(não informado)'}`),
    '',
    `IP: ${ip}`,
    `Recebido em: ${new Date().toISOString()}`,
  ].join('\n')

  const assunto = ASSUNTOS[tipo](extras)
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
      // Sem credencial configurada: não some com a mensagem em silêncio.
      console.warn('[mensagem] Nenhum provedor de e-mail configurado. Conteúdo recebido:\n' + texto)
      throw createError({
        statusCode: 503,
        message: 'O envio automático ainda não está configurado. Manda um e-mail pra devpporg@gmail.com que a gente resolve na mão.',
      })
    }
  }
  catch (erro: any) {
    if (erro?.statusCode) throw erro
    console.error('[mensagem] falha ao enviar', erro)
    throw createError({ statusCode: 502, message: 'Não deu pra enviar agora. Tenta de novo em instantes.' })
  }

  return { ok: true }
})
