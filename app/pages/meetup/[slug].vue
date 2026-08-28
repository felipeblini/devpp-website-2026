<script setup lang="ts">
import { proximoMeetup as m } from '#shared/meetup'

const route = useRoute()
if (route.params.slug !== m.slug) {
  throw createError({ statusCode: 404, statusMessage: 'Encontro não encontrado', fatal: true })
}

const { public: { siteUrl } } = useRuntimeConfig()
const url = `${siteUrl}/meetup/${m.slug}`

useSeoMeta({
  title: `DEV-PP ${m.numero} — ${m.titulo} · ${m.dataExtenso}`,
  description: `${m.chamada} Meetup gratuito em Presidente Prudente, ${m.dataExtenso}. Inscrição aberta.`,
  ogTitle: `DEV-PP ${m.numero} — ${m.dataExtenso}`,
  ogDescription: m.chamada,
  ogUrl: url,
  ogLocale: 'pt_BR',
  ogImage: `${siteUrl}/img/devpp-og-icon.png`,
  twitterCard: 'summary',
})
useHead({ link: [{ rel: 'canonical', href: url }] })
</script>

<template>
  <article>
    <section class="border-b border-line-soft">
      <div class="mx-auto max-w-4xl px-5 py-16 lg:py-20">
        <NuxtLink to="/" class="font-mono text-sm text-fg-dim hover:text-primary">
          ← cd ..
        </NuxtLink>

        <p class="pixel mt-8 text-[0.62rem] text-accent">
          meetup {{ m.numero }} · {{ m.diaSemana }}, {{ m.dataExtenso }}
        </p>
        <h1 class="mt-4 text-4xl sm:text-5xl">{{ m.titulo }}</h1>
        <p class="mt-5 max-w-2xl text-lg text-fg-muted">{{ m.chamada }}</p>

        <dl class="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">quando</dt>
            <dd class="mt-1 font-mono font-bold">24/09/2026</dd>
            <dd class="font-mono text-sm text-fg-muted">{{ m.horario ?? 'horário a definir' }}</dd>
          </div>
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">onde</dt>
            <dd class="mt-1 font-mono font-bold">{{ m.local ?? 'a definir' }}</dd>
            <dd class="font-mono text-sm text-fg-muted">{{ m.cidade }}</dd>
          </div>
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">quanto</dt>
            <dd class="mt-1 font-mono font-bold text-primary">gratuito</dd>
            <dd class="font-mono text-sm text-fg-muted">sem ingresso, sem cadastro</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-b border-line-soft bg-bg-deep">
      <div class="mx-auto grid max-w-4xl gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 class="text-2xl">Programação</h2>
          <ol class="mt-6">
            <li
              v-for="(item, i) in m.agenda"
              :key="item.titulo"
              class="grid grid-cols-[auto_1fr] gap-x-4 border-t border-line-soft py-5 first:border-t-0 first:pt-0"
            >
              <span class="pixel pt-1 text-[0.6rem] text-primary">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <p class="font-mono font-bold">{{ item.titulo }}</p>
                <p class="mt-1 text-sm text-fg-muted">{{ item.detalhe }}</p>
              </div>
            </li>
          </ol>

          <div v-if="!m.palestrantes.length" class="mt-8 border border-dashed border-line p-5">
            <p class="font-mono text-sm font-bold text-accent">Palestrantes: em definição</p>
            <p class="mt-2 text-sm text-fg-muted">
              A chamada está aberta. Quer falar? Marca "quero palestrar" aqui do lado.
            </p>
          </div>
        </div>

        <div>
          <h2 class="text-2xl">Garantir minha vaga</h2>
          <p class="mt-3 text-fg-muted">
            Nome e e-mail. A gente avisa quando local e horário fecharem.
          </p>
          <div class="mt-6">
            <FormInscricao :meetup="m.slug" />
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
