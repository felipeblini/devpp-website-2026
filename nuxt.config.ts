import tailwindcss from '@tailwindcss/vite'

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
      routes: ['/meetup/2026-09-24'],
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
