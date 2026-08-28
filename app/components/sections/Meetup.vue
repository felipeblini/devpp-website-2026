<script setup lang="ts">
import { proximoMeetup as m } from '#shared/meetup'
</script>

<template>
  <section id="meetup" class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead
        comando="devpp next"
        titulo="O próximo encontro"
        :descricao="m.chamada"
      />

      <div class="mt-12 grid gap-8 lg:grid-cols-12">
        <!-- cartão da data -->
        <div class="min-w-0 lg:col-span-4">
          <div class="win sticky top-24">
            <div class="win-bar">
              <span class="win-dot" /><span class="win-dot" /><span class="win-dot" />
              <span class="ml-2">meetup{{ m.numero }}.ics</span>
            </div>
            <div class="p-6">
              <p class="pixel text-[0.6rem] text-fg-dim">{{ m.diaSemana }}</p>
              <p class="mt-2 font-mono text-6xl font-extrabold leading-none text-accent">24</p>
              <p class="mt-1 font-mono text-lg font-bold">setembro / 2026</p>

              <dl class="mt-6 space-y-3 border-t border-line-soft pt-5 font-mono text-sm">
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">horário</dt>
                  <dd :class="m.horario ? 'text-fg' : 'text-fg-muted'">
                    {{ m.horario ?? 'a definir' }}
                  </dd>
                </div>
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">local</dt>
                  <dd :class="m.local ? 'text-fg' : 'text-fg-muted'">
                    {{ m.local ?? 'a definir' }}
                  </dd>
                  <dd class="text-fg-dim">{{ m.cidade }}</dd>
                </div>
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">entrada</dt>
                  <dd class="font-bold text-primary">gratuita</dd>
                </div>
              </dl>

              <AppButton href="#inscricao" class="mt-6 w-full">
                garantir minha vaga
              </AppButton>
              <p class="mt-3 text-center font-mono text-[0.68rem] text-fg-dim">
                a gente avisa por e-mail quando o local fechar
              </p>
              <NuxtLink
                :to="`/meetup/${m.slug}`"
                class="mt-4 block text-center font-mono text-xs text-fg-muted underline underline-offset-4 hover:text-primary"
              >
                página completa do encontro →
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- agenda -->
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

          <div class="mt-8 border border-dashed border-line p-6">
            <p class="font-mono text-sm font-bold text-accent">
              Grade em construção
            </p>
            <p class="mt-2 text-sm text-fg-muted">
              Palestrantes, horário e local ainda estão sendo fechados — faltam poucas
              semanas e a gente publica aqui assim que confirmar. Quem se inscrever
              recebe por e-mail antes de todo mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
