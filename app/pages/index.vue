<script setup lang="ts">
const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'DEV-PP — comunidade de desenvolvedores de Presidente Prudente',
  description:
    'A comunidade dev de Presidente Prudente e região voltou. Meetup gratuito dia 24 de setembro de 2026: palestras da comunidade, papo técnico e networking. Inscrição aberta.',
  ogTitle: 'DEV-PP — a comunidade dev de Presidente Prudente voltou a rodar',
  ogDescription:
    'Meetup gratuito em 24/09/2026. Palestras da comunidade, papo técnico e networking em Presidente Prudente. Inscrição aberta.',
  ogType: 'website',
  ogUrl: siteUrl,
  ogLocale: 'pt_BR',
  ogImage: `${siteUrl}/img/devpp-og-icon.png`,
  twitterCard: 'summary',
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Event',
        'name': 'DEV-PP #01 — a comunidade está de volta',
        'startDate': '2026-09-24',
        'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
        'eventStatus': 'https://schema.org/EventScheduled',
        'location': {
          '@type': 'Place',
          'name': 'A definir',
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
        'description':
          'Meetup gratuito da comunidade de desenvolvedores de Presidente Prudente e região.',
      }),
    },
  ],
})
</script>

<template>
  <div>
    <SectionsHero />
    <SectionsMeetup />
    <SectionsSobre />
    <SectionsComoFunciona />
    <SectionsPalestrar />
    <SectionsVagas />
    <SectionsFaq />
    <SectionsInscricao />
    <SectionsParceiros />
  </div>
</template>
