<script setup lang="ts">
/**
 * /links — a página da bio do Instagram (e de qualquer perfil): um link por linha,
 * grande o bastante pro dedão. Sem menu (o app.vue esconde o header aqui).
 * Os canais vêm de content/comunidade.json.
 *
 * GA4 é o do site inteiro (nuxt-gtag); aqui cada clique ainda dispara um evento
 * `click_link` com o id do destino, pra dar pra ver na bio o que a galera clica.
 */
import dados from '~~/content/comunidade.json'

interface Canal {
  id: string
  nome: string
  descricao: string
  acao: string
  url: string | null
  pendente: string | null
}

const canais = (dados.canais as Canal[]).filter(c => c.url)

const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'Links — DEV-PP',
  description: 'Os links da comunidade dev de Presidente Prudente: WhatsApp, Facebook, Instagram, vagas, parcerias e o site.',
  ogUrl: `${siteUrl}/links`,
  ogLocale: 'pt_BR',
  robots: 'noindex',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/links` }] })

function clicou(id: string) {
  useTrackEvent('click_link', { link_id: id, page: 'links' })
}

const cardClasse = 'block border border-line bg-bg p-5 transition-colors hover:border-primary'
const acaoClasse = 'mt-4 font-mono text-sm font-bold tracking-wide text-primary uppercase'
</script>

<template>
  <article class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-md px-5 py-14 lg:py-20">
      <div class="text-center">
        <img
          src="/img/devpp-logo.png"
          alt="DEV-PP"
          width="366"
          height="80"
          class="mx-auto h-9 w-auto [image-rendering:pixelated]"
        >
        <p class="mt-4 text-sm text-fg-muted">
          Comunidade dev de Presidente Prudente e região.
        </p>
      </div>

      <ul class="mt-8 grid gap-3">
        <li v-for="c in canais" :key="c.id">
          <a
            :href="c.url!"
            target="_blank"
            rel="noopener"
            :class="cardClasse"
            @click="clicou(c.id)"
          >
            <p class="pixel text-[0.6rem] text-fg-dim">{{ c.id }}</p>
            <p class="mt-2 font-mono text-lg font-bold">{{ c.nome }}</p>
            <p class="mt-1 text-sm text-fg-muted">{{ c.descricao }}</p>
            <p :class="acaoClasse">{{ c.acao }} ↗</p>
          </a>
        </li>

        <li>
          <a
            href="https://github.com/dev-pp/vagas/issues"
            target="_blank"
            rel="noopener"
            :class="cardClasse"
            @click="clicou('vagas')"
          >
            <p class="pixel text-[0.6rem] text-fg-dim">vagas</p>
            <p class="mt-2 font-mono text-lg font-bold">Vagas</p>
            <p class="mt-1 text-sm text-fg-muted">Quem está contratando na região, direto de quem frequenta os meetups.</p>
            <p :class="acaoClasse">abrir o board de vagas ↗</p>
          </a>
        </li>

        <li>
          <a
            href="mailto:devpporg@gmail.com?subject=Parceria%20com%20o%20DEV-PP"
            :class="cardClasse"
            @click="clicou('parceria')"
          >
            <p class="pixel text-[0.6rem] text-fg-dim">parcerias</p>
            <p class="mt-2 font-mono text-lg font-bold">Quer ser um parceiro?</p>
            <p class="mt-1 text-sm text-fg-muted">Espaço, café, brindes, divulgação: meetup gratuito tem custo, e a gente divide o palco com quem ajuda.</p>
            <p :class="acaoClasse">devpporg@gmail.com ↗</p>
          </a>
        </li>

        <li>
          <NuxtLink
            to="/"
            :class="cardClasse"
            @click="clicou('site')"
          >
            <p class="pixel text-[0.6rem] text-fg-dim">site</p>
            <p class="mt-2 font-mono text-lg font-bold">devpp.com.br</p>
            <p class="mt-1 text-sm text-fg-muted">Sobre a comunidade, como palestrar, próximo meetup e os encontros anteriores.</p>
            <p :class="acaoClasse">abrir o site ↗</p>
          </NuxtLink>
        </li>
      </ul>

    </div>
  </article>

  <footer class="mx-auto max-w-md px-5 py-8 text-center font-mono text-xs text-fg-dim">
    <p>DEV-PP · feito pela comunidade, pra comunidade</p>
    <p class="mt-2">
      <a href="mailto:devpporg@gmail.com" class="underline underline-offset-4 hover:text-primary">devpporg@gmail.com</a>
    </p>
  </footer>
</template>
