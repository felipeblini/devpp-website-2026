/**
 * Dados do próximo encontro.
 * Campos ainda não definidos ficam como `null` — a UI trata isso e mostra
 * "a definir" em vez de inventar local/horário.
 */
export interface Meetup {
  slug: string
  numero: string
  titulo: string
  chamada: string
  /** ISO 8601, data do encontro */
  data: string
  dataExtenso: string
  diaSemana: string
  /** null = ainda não definido */
  horario: string | null
  local: string | null
  endereco: string | null
  cidade: string
  vagas: number | null
  agenda: { hora: string | null; titulo: string; detalhe: string }[]
  palestrantes: { nome: string; tema: string; bio?: string }[]
}

export const proximoMeetup: Meetup = {
  slug: '2026-09-24',
  numero: '#01',
  titulo: 'O DEV-PP está de volta',
  chamada:
    'Cinco anos parados. Um encontro pra recomeçar: código, carreira e a galera da região na mesma sala de novo.',
  data: '2026-09-24',
  dataExtenso: '24 de setembro de 2026',
  diaSemana: 'quinta-feira',
  horario: null,
  local: null,
  endereco: null,
  cidade: 'Presidente Prudente — SP',
  vagas: null,
  agenda: [
    {
      hora: null,
      titulo: 'Credenciamento e cafezinho',
      detalhe: 'Chega cedo — metade do meetup acontece antes da primeira palestra.',
    },
    {
      hora: null,
      titulo: 'Abertura: o que é o DEV-PP e por que voltamos',
      detalhe: 'De onde a comunidade veio, o que mudou em cinco anos e pra onde a gente vai.',
    },
    {
      hora: null,
      titulo: 'Palestras da comunidade',
      detalhe: 'Chamada aberta. Pode ser você — a inscrição de palestra está no ar.',
    },
    {
      hora: null,
      titulo: 'Networking',
      detalhe: 'A parte que ninguém pula. Trocar ideia, indicar vaga, marcar o próximo.',
    },
  ],
  palestrantes: [],
}
