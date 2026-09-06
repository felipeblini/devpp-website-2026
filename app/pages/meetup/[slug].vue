<script setup lang="ts">
import { acharMeetup, partesDaData, jaAconteceu } from '#shared/meetups'

const route = useRoute()
const m = acharMeetup(String(route.params.slug))
if (!m) {
  throw createError({ statusCode: 404, statusMessage: 'Encontro não encontrado', fatal: true })
}

// Encontros antigos podem não ter data registrada.
const data = m.data ? partesDaData(m.data) : null
const passado = jaAconteceu(m)
const apoiadores = m.apoiadores ?? []
const temProgramacao = m.agenda.length > 0 || m.palestrantes.length > 0

const { public: { siteUrl } } = useRuntimeConfig()
const url = `${siteUrl}/meetup/${m.slug}`
const chamada = m.chamada ?? 'Um dos encontros da comunidade dev de Presidente Prudente e região.'
const tituloSeo = data ? `${m.titulo} — ${data.extenso}` : m.titulo

useSeoMeta({
  title: tituloSeo,
  description: data
    ? `${chamada} Encontro em ${m.cidade}, ${data.extenso}. Entrada livre.`
    : `${chamada} Encontro em ${m.cidade}.`,
  ogTitle: tituloSeo,
  ogDescription: chamada,
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
          <NuxtLink
            to="/"
            class="group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-primary"
          ><UiIcone nome="seta-esquerda" class="inline-block text-fg-dim transition-colors group-hover:text-primary" /><UiPrompt /><span class="underline underline-offset-4">cd ..</span></NuxtLink>
        </p>

        <p class="pixel mt-8 text-[0.62rem]" :class="data ? 'text-accent' : 'text-fg-dim'">
          <template v-if="data">{{ data.diaSemana }}, {{ data.extenso }}</template>
          <template v-else>data não registrada</template>
        </p>
        <h1 class="mt-4 text-4xl sm:text-5xl">{{ m.titulo }}</h1>
        <p class="mt-5 max-w-2xl text-lg text-fg-muted">{{ chamada }}</p>

        <dl class="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">quando</dt>
            <dd class="mt-1 font-mono font-bold" :class="!data && 'text-fg-muted'">
              <span v-if="data">{{ data.curta }}</span>
              <span v-else>—</span>
            </dd>
            <dd class="font-mono text-sm text-fg-muted">
              <span v-if="m.horario">{{ m.horario }}</span>
              <UiCarregando v-else-if="!passado" texto="horário a definir" />
            </dd>
          </div>
          <div class="bg-bg p-5">
            <dt class="font-mono text-[0.68rem] text-fg-dim">onde</dt>
            <dd class="mt-1 font-mono font-bold" :class="!m.local && 'text-fg-muted'">
              <a
                v-if="m.local && m.localSite"
                :href="m.localSite"
                target="_blank"
                rel="noopener"
                class="underline underline-offset-4 transition-colors hover:text-primary"
              >{{ m.local }} ↗</a>
              <span v-else-if="m.local">{{ m.local }}</span>
              <UiCarregando v-else-if="!passado" texto="a definir" />
              <span v-else>—</span>
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
              {{ passado ? 'Entrada foi livre, como sempre' : 'Entrada livre… só chegar' }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-b border-line-soft bg-bg-deep">
      <div class="mx-auto max-w-4xl px-5 py-16">
        <h2 class="text-2xl">Programação</h2>

        <template v-if="temProgramacao">
          <ol v-if="m.agenda.length" class="mt-6">
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
            :class="m.agenda.length ? 'mt-12' : 'mt-6'"
            :palestrantes="m.palestrantes"
          />
        </template>

        <p v-else class="mt-6 font-mono text-sm text-fg-dim">
          <UiPrompt />{{ ' ' }}cat programacao.md<br>
          <span class="text-danger">cat: programacao.md: No such file or directory</span><br>
          // o registro desse encontro se perdeu no tempo. Se você esteve lá e lembra
          de algo, manda pra
          <a href="mailto:devpporg@gmail.com" class="text-primary underline underline-offset-4">devpporg@gmail.com</a>.
        </p>

        <AvisoChamada v-if="!passado" class="mt-10" :meetup="m" link="/#palestrar" />
      </div>
    </section>

    <SectionsInscricao v-if="!passado" :meetup="m" />

    <section v-if="apoiadores.length" class="border-b border-line-soft">
      <div class="mx-auto max-w-4xl px-5 py-16">
        <p class="font-mono text-[0.72rem] tracking-wide text-fg-muted">
          <UiPrompt />{{ ' ' }}cat apoiadores.txt
        </p>
        <h2 class="mt-3 text-2xl">
          {{ passado ? 'Quem apoiou esse encontro' : 'Quem apoia esse encontro' }}
        </h2>
        <p class="mt-3 max-w-xl text-sm text-fg-muted">
          Espaço, café, projetor, cerveja: meetup gratuito tem custo, e quem segura
          essa onda merece o nome aqui.
        </p>

        <ul class="mt-8 flex flex-wrap gap-4">
          <li v-for="a in apoiadores" :key="a.nome">
            <component
              :is="a.site ? 'a' : 'div'"
              :href="a.site ?? undefined"
              :target="a.site ? '_blank' : undefined"
              :rel="a.site ? 'noopener' : undefined"
              class="group block"
            >
              <span
                class="flex h-24 w-48 items-center justify-center border border-primary bg-white p-1 transition-colors group-hover:border-primary-deep"
              >
                <img
                  :src="a.logo"
                  :alt="`Logo de ${a.nome}`"
                  loading="lazy"
                  class="max-h-full max-w-full object-contain"
                >
              </span>
              <span class="mt-2 block text-center font-mono text-xs text-fg-muted group-hover:text-primary">
                {{ a.nome }}<template v-if="a.site"> ↗</template>
              </span>
            </component>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>
