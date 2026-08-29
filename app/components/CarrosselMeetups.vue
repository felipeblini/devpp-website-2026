<script setup lang="ts">
import type { Meetup } from '#shared/meetups'
import { partesDaData } from '#shared/meetups'

defineProps<{ meetups: Meetup[] }>()

const trilho = ref<HTMLElement | null>(null)

function rolar(direcao: 1 | -1) {
  const el = trilho.value
  if (!el) return
  // rola um cartão por clique, seja qual for a largura da tela
  const passo = el.querySelector('li')?.clientWidth ?? 280
  el.scrollBy({ left: direcao * (passo + 16), behavior: 'smooth' })
}
</script>

<template>
  <div>
    <div class="flex items-end justify-between gap-4">
      <h3 class="font-mono text-[0.78rem] text-fg-muted">
        <UiPrompt />{{ ' ' }}devpp meetups --list
      </h3>

      <div class="flex gap-2">
        <button
          type="button"
          class="grid size-9 place-items-center border border-line font-mono text-fg-muted transition-colors hover:border-primary hover:text-primary"
          aria-label="Ver encontros anteriores"
          @click="rolar(-1)"
        >
          ‹
        </button>
        <button
          type="button"
          class="grid size-9 place-items-center border border-line font-mono text-fg-muted transition-colors hover:border-primary hover:text-primary"
          aria-label="Ver encontros seguintes"
          @click="rolar(1)"
        >
          ›
        </button>
      </div>
    </div>

    <ul
      ref="trilho"
      class="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
    >
      <li
        v-for="m in meetups"
        :key="m.slug"
        class="w-[17rem] shrink-0 snap-start sm:w-[19rem]"
      >
        <NuxtLink
          :to="`/meetup/${m.slug}`"
          class="group flex h-full flex-col border border-line bg-bg p-5 transition-colors hover:border-primary"
        >
          <p class="font-mono text-xs text-accent">
            {{ partesDaData(m.data).curta }}
          </p>
          <p class="mt-2 font-mono text-lg font-bold group-hover:text-primary">
            {{ m.titulo }}
          </p>
          <p v-if="m.local" class="mt-1 font-mono text-xs text-fg-dim">
            {{ m.local }}
          </p>
          <p class="mt-3 flex-1 text-sm text-fg-muted">
            {{ m.chamada }}
          </p>
          <p class="mt-4 font-mono text-xs text-fg-dim">
            <span v-if="m.palestrantes.length">
              {{ m.palestrantes.length }}
              {{ m.palestrantes.length === 1 ? 'palestra' : 'palestras' }}
            </span>
            <span v-else>registro do encontro</span>
            <span class="text-primary"> →</span>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
