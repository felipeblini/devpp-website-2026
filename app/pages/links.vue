<script setup lang="ts">
/**
 * /links — a página da bio do Instagram (e de qualquer perfil): um link por linha,
 * grande o bastante pro dedão. O próximo encontro entra sozinho enquanto estiver
 * confirmado; os canais vêm de content/comunidade.json.
 *
 * GA4 é o do site inteiro (nuxt-gtag); aqui cada clique ainda dispara um evento
 * `click_link` com o id do destino, pra dar pra ver na bio o que a galera clica.
 */
import dados from '~~/content/comunidade.json'
import { proximoMeetup, partesDaData } from '#shared/meetups'

interface Canal {
  id: string
  nome: string
  descricao: string
  acao: string
  url: string | null
  pendente: string | null
}

const canais = (dados.canais as Canal[]).filter(c => c.url)
const m = proximoMeetup
const data = m?.data ? partesDaData(m.data) : null

const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'Links — DEV-PP',
  description: 'Os links da comunidade dev de Presidente Prudente: próximo meetup, WhatsApp, Facebook e o site.',
  ogUrl: `${siteUrl}/links`,
  ogLocale: 'pt_BR',
  robots: 'noindex',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/links` }] })

function clicou(id: string) {
  useTrackEvent('click_link', { link_id: id, page: 'links' })
}
</script>

<template>
  <article class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-md px-5 py-14 lg:py-20">
      <p class="font-mono text-[0.72rem] text-fg-muted">
        <UiPrompt />{{ ' ' }}cat links.txt
      </p>
      <h1 class="mt-3 text-3xl">
        <span class="text-primary glow">DEV-PP</span> — os links
      </h1>
      <p class="mt-2 text-sm text-fg-muted">
        Comunidade dev de Presidente Prudente e região. Tudo gratuito.
      </p>

      <ul class="mt-8 grid gap-3">
        <li v-if="m && data">
          <NuxtLink
            :to="`/meetup/${m.slug}`"
            class="block border border-primary bg-bg p-5 transition-colors hover:bg-surface"
            @click="clicou('meetup')"
          >
            <p class="pixel text-[0.6rem] text-accent">próximo meetup · {{ data.curta }}</p>
            <p class="mt-2 font-mono text-lg font-bold">{{ m.titulo }}</p>
            <p class="mt-1 text-sm text-fg-muted">{{ m.local ?? 'local a definir' }} · {{ m.horario ?? 'horário a definir' }}</p>
            <p class="mt-4 font-mono text-sm font-bold tracking-wide text-primary uppercase">garanta a sua vaga ↗</p>
          </NuxtLink>
        </li>

        <li v-for="c in canais" :key="c.id">
          <a
            :href="c.url!"
            target="_blank"
            rel="noopener"
            class="block border border-line bg-bg p-5 transition-colors hover:border-primary"
            @click="clicou(c.id)"
          >
            <p class="pixel text-[0.6rem] text-fg-dim">{{ c.id }}</p>
            <p class="mt-2 font-mono text-lg font-bold">{{ c.nome }}</p>
            <p class="mt-1 text-sm text-fg-muted">{{ c.descricao }}</p>
            <p class="mt-4 font-mono text-sm font-bold tracking-wide text-primary uppercase">{{ c.acao }} ↗</p>
          </a>
        </li>

        <li>
          <NuxtLink
            to="/"
            class="block border border-line bg-bg p-5 transition-colors hover:border-primary"
            @click="clicou('site')"
          >
            <p class="pixel text-[0.6rem] text-fg-dim">site</p>
            <p class="mt-2 font-mono text-lg font-bold">devpp.com.br</p>
            <p class="mt-1 text-sm text-fg-muted">Sobre a comunidade, como palestrar, vagas e os encontros anteriores.</p>
            <p class="mt-4 font-mono text-sm font-bold tracking-wide text-primary uppercase">abrir o site ↗</p>
          </NuxtLink>
        </li>
      </ul>

      <p class="mt-10 font-mono text-xs text-fg-dim">
        <UiPrompt />{{ ' ' }}echo "feito pela comunidade, pra comunidade"
      </p>
    </div>
  </article>
</template>
