/**
 * Dados do próximo encontro.
 * Campos ainda não definidos ficam como `null` — a UI trata isso e mostra
 * "a definir" em vez de inventar informação.
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
  mapa: string | null
  cidade: string
  vagas: number | null
  agenda: { hora: string | null; titulo: string; detalhe: string }[]
  palestrantes: { nome: string; tema: string; bio?: string }[]
}

export const proximoMeetup: Meetup = {
  slug: '2026-09-24',
  numero: '#32',
  titulo: 'Encontro de setembro',
  chamada:
    'Uma noite de palestra, papo técnico e networking com a galera que escreve código na região.',
  data: '2026-09-24',
  dataExtenso: '24 de setembro de 2026',
  diaSemana: 'quinta-feira',
  horario: 'a partir das 18h',
  local: 'Fundação Inova Prudente',
  mapa: 'https://www.google.com/maps/place/Funda%C3%A7%C3%A3o+Inova+Prudente/@-22.1339797,-51.4500853,17z/data=!3m1!4b1!4m6!3m5!1s0x9493f394b3df5d51:0xac050e5ae9c9ef!8m2!3d-22.1339847!4d-51.4475104!16s%2Fg%2F11c7140bpb!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D',
  cidade: 'Presidente Prudente — SP',
  vagas: null,
  agenda: [
    {
      hora: '18h',
      titulo: 'Credenciamento e cafezinho',
      detalhe: 'Chega cedo — metade do meetup acontece antes da primeira palestra.',
    },
    {
      hora: null,
      titulo: 'Abertura',
      detalhe: 'O que é o DEV-PP, o que a comunidade anda fazendo e os avisos da noite.',
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
