<script setup lang="ts">
const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'DEV-PP — comunidade de desenvolvedores de Presidente Prudente',
  description:
    'Comunidade de desenvolvedores de Presidente Prudente e região. Meetup gratuito dia 24 de setembro de 2026, às 18h, no Inova Prudente: palestras da comunidade, papo técnico e networking.',
  ogTitle: 'DEV-PP — a comunidade dev de Presidente Prudente',
  ogDescription:
    'Meetup gratuito em 24/09/2026, às 18h, no Inova Prudente. Palestras da comunidade, papo técnico e networking. Inscrição aberta.',
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
        'name': 'DEV-PP #32 — encontro de setembro',
        'startDate': '2026-09-24T18:00:00-03:00',
        'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
        'eventStatus': 'https://schema.org/EventScheduled',
        'location': {
          '@type': 'Place',
          'name': 'Fundação Inova Prudente',
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
