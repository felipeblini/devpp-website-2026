<script setup lang="ts">
import { acharMeetup, partesDaData } from '#shared/meetups'

const route = useRoute()
const m = acharMeetup(String(route.params.slug))
if (!m) {
  throw createError({ statusCode: 404, statusMessage: 'Encontro não encontrado', fatal: true })
}

const data = partesDaData(m.data)
const { public: { siteUrl } } = useRuntimeConfig()
const url = `${siteUrl}/meetup/${m.slug}`

useSeoMeta({
  title: `${m.titulo} — ${data.extenso}`,
  description: `${m.chamada} Encontro em ${m.cidade}, ${data.extenso}. Entrada livre.`,
  ogTitle: `${m.titulo} — ${data.extenso}`,
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
        <p class="font-mono text-sm">
          <UiIcone nome="seta-esquerda" class="inline-block text-fg-dim" />{{ ' ' }}<UiPrompt />{{ ' ' }}<NuxtLink
            to="/"
            class="text-fg-muted underline underline-offset-4 transition-colors hover:text-primary"
          >cd ..</NuxtLink>
        </p>

        <p class="pixel mt-8 text-[0.62rem] text-accent">
          {{ data.diaSemana }}, {{ data.extenso }}
        </p>
        <h1 class="mt-4 text-4xl sm:text-5xl">{{ m.titulo }}</h1>
        <p class="mt-5 max-w-2xl text-lg text-fg-muted">{{ m.chamada }}</p>

        <dl class="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">quando</dt>
            <dd class="mt-1 font-mono font-bold">{{ data.curta }}</dd>
            <dd class="font-mono text-sm text-fg-muted">
              <span v-if="m.horario">{{ m.horario }}</span>
              <UiCarregando v-else texto="horário a definir" />
            </dd>
          </div>
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">onde</dt>
            <dd class="mt-1 font-mono font-bold">
              <span v-if="m.local">{{ m.local }}</span>
              <UiCarregando v-else texto="a definir" />
            </dd>
            <dd class="font-mono text-sm text-fg-muted">{{ m.cidade }}</dd>
            <dd v-if="m.mapa" class="mt-1">
              <a
                :href="m.mapa"
                target="_blank"
                rel="noopener"
                class="font-mono text-sm text-primary underline underline-offset-4"
              >ver no mapa ↗</a>
            </dd>
          </div>
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">pra quem</dt>
            <dd class="mt-1 text-sm text-fg-muted">
              Qualquer entusiasta de tecnologia, programadores, designers, empresários,
              estudantes.
            </dd>
            <dd class="mt-1 font-mono text-sm font-bold text-primary">
              Entrada livre… só chegar
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-b border-line-soft bg-bg-deep">
      <div class="mx-auto max-w-4xl px-5 py-16">
        <h2 class="text-2xl">Programação</h2>
        <ol class="mt-6">
          <li
            v-for="(item, i) in m.agenda"
            :key="item.titulo"
            class="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line-soft py-5 first:border-t-0 first:pt-0"
          >
            <span class="pixel pt-1 text-[0.6rem] text-primary">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <p class="font-mono text-lg font-bold">{{ item.titulo }}</p>
              <p class="mt-1 text-fg-muted">{{ item.detalhe }}</p>
              <p v-if="item.hora" class="mt-1 font-mono text-xs text-accent">{{ item.hora }}</p>
            </div>
          </li>
        </ol>

        <ListaPalestras
          v-if="m.palestrantes.length"
          class="mt-12"
          :palestrantes="m.palestrantes"
        />

        <AvisoChamada class="mt-10" :meetup="m" link="/#palestrar" />
      </div>
    </section>

    <SectionsInscricao :meetup="m" />
  </article>
</template>
