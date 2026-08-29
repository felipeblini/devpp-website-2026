import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

// As páginas de encontro saem do mesmo arquivo que alimenta o site.
const meetups = JSON.parse(readFileSync('./content/meetups.json', 'utf-8')).meetups as {
  slug: string
  status: string
}[]
const rotasDeMeetup = meetups
  .filter(m => m.status === 'confirmado')
  .map(m => `/meetup/${m.slug}`)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/image', '@vueuse/motion/nuxt'],

  css: ['~/assets/css/tailwind.css'],
  vite: { plugins: [tailwindcss()] },

  runtimeConfig: {
    // Preenchidos pelo .env — ver .env.example
    resendApiKey: '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPass: '',
    inscricaoTo: 'devpporg@gmail.com',
    inscricaoFrom: '',
    public: {
      siteUrl: 'https://devpp.com.br',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/codigo-de-conduta': { prerender: true },
    '/meetup/**': { prerender: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: rotasDeMeetup,
    },
  },

  fonts: {
    families: [
      { name: 'Silkscreen', provider: 'google', weights: [400, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 700, 800] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#0b0e13' }],
    },
  },
})
