<script setup lang="ts">
import { proximoMeetup as m, partesDaData, meetupsAnteriores } from '#shared/meetups'

const data = m ? partesDaData(m.data) : null
</script>

<template>
  <section
    v-if="m || meetupsAnteriores.length"
    id="meetups"
    class="border-b border-line-soft bg-bg-deep"
  >
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead
        v-if="m"
        comando="devpp --next"
        :titulo="m.titulo"
        :descricao="m.chamada"
      />

      <!-- ---------- com encontro marcado ---------- -->
      <div v-if="m && data" class="mt-12 grid gap-8 lg:grid-cols-12">
        <div class="min-w-0 lg:col-span-4">
          <div class="win sticky top-24">
            <div class="win-bar">
              <span class="win-dot" /><span class="win-dot" /><span class="win-dot" />
              <span class="ml-2">meetup#{{ m.numero }}.ics</span>
            </div>
            <div class="p-6">
              <p class="pixel text-[0.6rem] text-fg-dim">{{ data.diaSemana }}</p>
              <p class="mt-2 font-mono text-6xl font-extrabold leading-none text-accent">{{ data.dia }}</p>
              <p class="mt-1 font-mono text-lg font-bold">{{ data.mes }} / {{ data.ano }}</p>

              <dl class="mt-6 space-y-3 border-t border-line-soft pt-5 font-mono text-sm">
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">horário</dt>
                  <dd :class="m.horario ? 'text-fg' : 'text-fg-muted'">
                    <span v-if="m.horario">{{ m.horario }}</span>
                    <UiCarregando v-else texto="a definir" />
                  </dd>
                </div>
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">local</dt>
                  <dd :class="m.local ? 'text-fg' : 'text-fg-muted'">
                    <span v-if="m.local">{{ m.local }}</span>
                    <UiCarregando v-else texto="a definir" />
                  </dd>
                  <dd class="text-fg-dim">{{ m.cidade }}</dd>
                  <dd v-if="m.mapa" class="mt-1">
                    <a
                      :href="m.mapa"
                      target="_blank"
                      rel="noopener"
                      class="text-primary underline underline-offset-4"
                    >ver no mapa ↗</a>
                  </dd>
                </div>
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">entrada</dt>
                  <dd class="font-bold text-primary">gratuita</dd>
                </div>
              </dl>

              <AppButton :to="`/meetup/${m.slug}#inscricao`" class="mt-6 w-full">
                <UiIcone nome="commit" />
                garantir minha vaga
              </AppButton>
              <p class="mt-3 text-center font-mono text-[0.68rem] text-fg-dim">
                entrada livre — se inscreva e garanta sua vaga
              </p>
              <p class="mt-4 text-center font-mono text-xs">
                <UiPrompt />{{ ' ' }}<NuxtLink
                  :to="`/meetup/${m.slug}`"
                  class="underline underline-offset-4 transition-colors hover:text-primary"
                >cat detalhes.json</NuxtLink>
              </p>
            </div>
          </div>
        </div>

        <div class="min-w-0 lg:col-span-8">
          <h3 class="font-mono text-sm text-fg-dim">// como vai ser a noite</h3>
          <ol class="mt-5">
            <li
              v-for="(item, i) in m.agenda"
              :key="item.titulo"
              class="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line-soft py-6 first:border-t-0 first:pt-0"
            >
              <span class="pixel pt-1 text-[0.62rem] text-primary">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <div>
                <p class="font-mono text-lg font-bold">{{ item.titulo }}</p>
                <p class="mt-1 text-fg-muted">{{ item.detalhe }}</p>
                <p v-if="item.hora" class="mt-1 font-mono text-xs text-accent">{{ item.hora }}</p>
              </div>
            </li>
          </ol>

          <ListaPalestras
            v-if="m.palestrantes.length"
            class="mt-10"
            :palestrantes="m.palestrantes"
          />

          <AvisoChamada class="mt-8" :meetup="m" />
        </div>
      </div>

      <CarrosselMeetups
        v-if="meetupsAnteriores.length"
        :class="m && 'mt-20'"
        :meetups="meetupsAnteriores"
      />
    </div>
  </section>
</template>
