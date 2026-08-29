<script setup lang="ts">
import { proximoMeetup as m, proximoNumero, partesDaData } from '#shared/meetups'

const { public: { siteUrl } } = useRuntimeConfig()
const data = m ? partesDaData(m.data) : null

const descricao = m && data
  ? `Comunidade de desenvolvedores de Presidente Prudente e região. Meetup #${m.numero} gratuito em ${data.extenso}${m.horarioCurto ? `, às ${m.horarioCurto}` : ''}${m.local ? `, no ${m.local}` : ''}: palestras, papo técnico e networking.`
  : 'Comunidade de desenvolvedores de Presidente Prudente e região. Meetups gratuitos com palestras, papo técnico e networking. A chamada de palestras está sempre aberta.'

useSeoMeta({
  title: 'DEV-PP — comunidade de desenvolvedores de Presidente Prudente e região',
  description: descricao,
  ogTitle: 'DEV-PP — a comunidade dev de Presidente Prudente e região',
  ogDescription: descricao,
  ogType: 'website',
  ogUrl: siteUrl,
  ogLocale: 'pt_BR',
  ogImage: `${siteUrl}/img/devpp-og-icon.png`,
  twitterCard: 'summary',
})

// Só publica dados estruturados de evento quando existe evento de verdade.
const schema = m && data
  ? {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': `DEV-PP #${m.numero} — ${m.titulo}`,
      'startDate': m.horarioCurto ? `${m.data}T18:00:00-03:00` : m.data,
      'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
      'eventStatus': 'https://schema.org/EventScheduled',
      'location': {
        '@type': 'Place',
        'name': m.local ?? 'A definir',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Presidente Prudente',
          'addressRegion': 'SP',
          'addressCountry': 'BR',
        },
      },
      'organizer': { '@type': 'Organization', 'name': 'DEV-PP', 'url': siteUrl },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'BRL',
        'availability': 'https://schema.org/InStock',
        'url': `${siteUrl}/#inscricao`,
      },
      'description': m.chamada,
    }
  : {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'DEV-PP',
      'description': 'Comunidade de desenvolvedores de Presidente Prudente e região.',
      'url': siteUrl,
      'email': 'devpporg@gmail.com',
      'foundingDate': '2019',
      'areaServed': 'Presidente Prudente e região, SP, Brasil',
    }

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
})
</script>

<template>
  <div>
    <SectionsHero />
    <SectionsMeetup />
    <SectionsSobre />
    <SectionsComoFunciona />
    <SectionsPalestrar />
    <SectionsAjudar />
    <SectionsVagas />
    <SectionsFaq />
    <SectionsInscricao />
    <SectionsParceiros />
  </div>
</template>
