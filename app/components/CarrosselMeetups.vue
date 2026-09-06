<script setup lang="ts">
import type { Meetup } from '#shared/meetups'
import { partesDaData } from '#shared/meetups'

defineProps<{ meetups: Meetup[]; atual?: string }>()

const trilho = ref<HTMLElement | null>(null)

// Arrastar com o mouse rola a lista; um clique de verdade continua abrindo o encontro.
const arrastando = ref(false)
let arrastou = false
let inicioX = 0
let inicioScroll = 0

function pegar(e: PointerEvent) {
  const el = trilho.value
  if (!el || e.pointerType !== 'mouse' || e.button !== 0) return
  arrastando.value = true
  arrastou = false
  inicioX = e.clientX
  inicioScroll = el.scrollLeft
  el.setPointerCapture(e.pointerId)
}

function mover(e: PointerEvent) {
  const el = trilho.value
  if (!el || !arrastando.value) return
  const dx = e.clientX - inicioX
  if (Math.abs(dx) > 4) arrastou = true
  el.scrollLeft = inicioScroll - dx
}

function soltar(e: PointerEvent) {
  const el = trilho.value
  if (!el || !arrastando.value) return
  arrastando.value = false
  el.releasePointerCapture(e.pointerId)
}

function bloquearClique(e: MouseEvent) {
  if (arrastou) {
    e.preventDefault()
    e.stopPropagation()
    arrastou = false
  }
}

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
      class="mt-5 flex gap-4 overflow-x-auto pb-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      :class="arrastando ? 'cursor-grabbing' : 'cursor-grab snap-x snap-mandatory'"
      @pointerdown="pegar"
      @pointermove="mover"
      @pointerup="soltar"
      @pointercancel="soltar"
      @click.capture="bloquearClique"
    >
      <li
        v-for="m in meetups"
        :key="m.slug"
        class="w-[17rem] shrink-0 snap-start sm:w-[19rem]"
      >
        <NuxtLink
          :to="`/meetup/${m.slug}`"
          class="group flex h-full flex-col border border-line bg-bg p-5 transition-colors hover:border-primary"
          draggable="false"
        >
          <p class="flex items-center justify-between gap-2 font-mono text-xs text-accent">
            <span v-if="m.data">{{ partesDaData(m.data).curta }}</span>
            <span v-else class="text-fg-dim">data não registrada</span>
            <span v-if="m.slug === atual" class="pixel text-[0.5rem] text-primary">atual</span>
            <span v-else-if="m.numero === null" class="pixel text-[0.5rem] text-fg-dim">especial</span>
          </p>
          <p class="mt-2 font-mono text-lg font-bold group-hover:text-primary">
            {{ m.titulo }}
          </p>
          <p v-if="m.local" class="mt-1 font-mono text-xs text-fg-dim">
            {{ m.local }}
          </p>
          <p class="mt-3 flex-1 text-sm text-fg-muted">
            {{ m.chamada ?? 'Encontro dos tempos antigos. O registro se perdeu; a memória, não.' }}
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
