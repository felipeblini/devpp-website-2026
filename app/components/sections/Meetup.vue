<script setup lang="ts">
import { proximoMeetup as m, proximoNumero, partesDaData } from '#shared/meetups'

const data = m ? partesDaData(m.data) : null
</script>

<template>
  <section id="meetup" class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead
        comando="devpp next"
        titulo="O próximo encontro"
        :descricao="m ? m.chamada : undefined"
      >
        <template v-if="!m" #descricao>
          A data do encontro <strong class="font-semibold text-fg">#{{ proximoNumero }}</strong>
          ainda não está fechada. Enquanto isso a chamada de palestras segue aberta — e a
          gente aceita ajuda pra montar o próximo.
        </template>
      </UiSectionHead>

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

              <AppButton href="#inscricao" class="mt-6 w-full">
                garantir minha vaga
              </AppButton>
              <p class="mt-3 text-center font-mono text-[0.68rem] text-fg-dim">
                entrada livre — inscrever garante a sua vaga
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

          <div v-if="!m.palestrantes.length" class="mt-8 border border-dashed border-line p-6">
            <p class="font-mono text-sm font-bold text-accent">
              Palestras em confirmação
            </p>
            <p class="mt-2 text-sm text-fg-muted">
              A grade sai daqui a pouco — a chamada de palestras ainda está aberta.
              Quem se inscreve recebe por e-mail antes de todo mundo.
            </p>
          </div>

          <div v-else class="mt-10">
            <h3 class="font-mono text-sm text-fg-dim">// quem vai falar</h3>
            <ul class="mt-5 grid gap-px border border-line bg-line">
              <li
                v-for="pal in m.palestrantes"
                :key="pal.nome"
                class="grid gap-x-6 bg-bg p-6 sm:grid-cols-[5rem_1fr]"
              >
                <p class="font-mono text-sm font-bold text-accent">
                  {{ pal.hora ?? '—' }}
                </p>
                <div class="mt-2 sm:mt-0">
                  <p class="font-mono text-lg font-bold">{{ pal.palestra }}</p>
                  <p class="mt-2 font-mono text-sm text-primary">{{ pal.nome }}</p>
                  <p class="font-mono text-xs text-fg-dim">{{ pal.cargo }}</p>
                  <p class="mt-2 text-sm text-fg-muted">{{ pal.bio }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ---------- sem encontro marcado ---------- -->
      <div v-else class="mt-12 grid gap-8 lg:grid-cols-12">
        <div class="min-w-0 lg:col-span-5">
          <UiTerminalWindow :titulo="`meetup#${proximoNumero}.ics`">
            <div class="p-6">
              <p class="pixel text-[0.6rem] text-fg-dim">próximo encontro</p>
              <p class="mt-3 font-mono text-3xl font-extrabold text-accent">
                <UiCarregando />
              </p>
              <dl class="mt-6 space-y-3 border-t border-line-soft pt-5 font-mono text-sm">
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">data</dt>
                  <dd class="text-fg-muted"><UiCarregando texto="a definir" /></dd>
                </div>
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">local</dt>
                  <dd class="text-fg-muted"><UiCarregando texto="a definir" /></dd>
                  <dd class="text-fg-dim">Presidente Prudente e região</dd>
                </div>
                <div>
                  <dt class="text-[0.7rem] text-fg-dim">entrada</dt>
                  <dd class="font-bold text-primary">gratuita, como sempre</dd>
                </div>
              </dl>
              <AppButton href="#ajudar" class="mt-6 w-full">
                ajudar a marcar o próximo
              </AppButton>
            </div>
          </UiTerminalWindow>
        </div>

        <div class="min-w-0 lg:col-span-7">
          <h3 class="font-mono text-sm text-fg-dim">// enquanto a data não sai</h3>
          <div class="mt-5 space-y-4 text-fg-muted">
            <p>
              Encontro do DEV-PP não nasce de cima pra baixo: ele aparece quando tem
              palestra pra apresentar, um espaço pra receber a galera e alguém disposto a
              bancar o café. Quando essas três coisas se encontram, a data sai.
            </p>
            <p>
              Se você quer <strong class="font-semibold text-fg">palestrar</strong>,
              tem <strong class="font-semibold text-fg">um espaço</strong> ou conhece uma
              <strong class="font-semibold text-fg">empresa que queira apoiar</strong>,
              é aqui que a fila anda.
            </p>
          </div>
          <div class="mt-7 flex flex-wrap gap-3">
            <AppButton href="#palestrar" variante="linha">quero palestrar</AppButton>
            <AppButton href="#ajudar" variante="linha">quero ajudar de outro jeito</AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
