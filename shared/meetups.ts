import dados from '../content/meetups.json'

export interface ItemAgenda {
  hora: string | null
  titulo: string
  detalhe: string
}

export interface Palestrante {
  nome: string
  cargo: string
  /** URL da foto (avatar). null = mostra as iniciais. */
  foto: string | null
  bio: string
  palestra: string
  /** null = ainda não encaixado na grade */
  hora: string | null
}

export interface Meetup {
  numero: number
  slug: string
  status: string
  titulo: string
  chamada: string
  data: string
  horario: string | null
  horarioCurto: string | null
  local: string | null
  /** site do local; null = nome sem link */
  localSite: string | null
  mapa: string | null
  cidade: string
  agenda: ItemAgenda[]
  palestrantes: Palestrante[]
}

const todos = (dados.meetups as Meetup[]).slice().sort((a, b) => a.data.localeCompare(b.data))

/** Data de hoje em ISO — fixada no build, porque as páginas são pré-renderizadas. */
const hoje = new Date().toISOString().slice(0, 10)

/**
 * O próximo encontro confirmado, ou `null` quando ainda não há data marcada.
 * Sem encontro marcado o site entra em modo "loading...".
 */
export const proximoMeetup: Meetup | null =
  todos.find(m => m.status === 'confirmado' && m.data >= hoje) ?? null

/** Número do encontro a anunciar — o confirmado, ou o próximo da fila. */
export const proximoNumero: number = proximoMeetup
  ? proximoMeetup.numero
  : Math.max(0, ...todos.map(m => m.numero)) + 1

/** Edições já realizadas, da mais recente para a mais antiga. */
export const meetupsAnteriores: Meetup[] = todos
  .filter(m => m.status === 'confirmado' && m.data < hoje)
  .reverse()

/** Todos os encontros com página própria (usado no prerender). */
export const meetupsComPagina: Meetup[] = todos.filter(m => m.status === 'confirmado')

export function acharMeetup(slug: string): Meetup | undefined {
  return todos.find(m => m.slug === slug)
}

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]
const DIAS = [
  'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
  'quinta-feira', 'sexta-feira', 'sábado',
]

export function partesDaData(iso: string) {
  const [ano, mes, dia] = iso.split('-').map(Number)
  const d = new Date(Date.UTC(ano!, mes! - 1, dia!))
  return {
    dia: String(dia).padStart(2, '0'),
    mes: MESES[mes! - 1]!,
    ano: String(ano),
    diaSemana: DIAS[d.getUTCDay()]!,
    extenso: `${dia} de ${MESES[mes! - 1]} de ${ano}`,
    curta: `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`,
  }
}
