<script setup lang="ts">
import type { Palestrante } from '#shared/meetups'

withDefaults(
  defineProps<{ palestrantes: Palestrante[]; titulo?: string }>(),
  { titulo: '// palestras' },
)

/** Iniciais pra quando não houver foto. */
function iniciais(nome: string) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase()
}
</script>

<template>
  <div>
    <h3 class="font-mono text-sm text-fg-dim">{{ titulo }}</h3>
    <ul class="mt-5 grid gap-px border border-line bg-line">
      <li
        v-for="pal in palestrantes"
        :key="pal.nome"
        class="grid gap-x-6 bg-bg p-6 sm:grid-cols-[5rem_1fr]"
      >
        <p class="font-mono text-sm font-bold text-accent">
          {{ pal.hora ?? '—' }}
        </p>
        <div class="mt-2 min-w-0 sm:mt-0">
          <p class="font-mono text-lg font-bold">{{ pal.palestra }}</p>

          <div class="mt-3 flex items-center gap-3">
            <img
              v-if="pal.foto"
              :src="pal.foto"
              :alt="`Foto de ${pal.nome}`"
              width="80"
              height="80"
              loading="lazy"
              class="size-10 shrink-0 rounded-full border border-line object-cover"
            >
            <span
              v-else
              aria-hidden="true"
              class="grid size-10 shrink-0 place-items-center rounded-full border border-line font-mono text-xs text-fg-dim"
            >{{ iniciais(pal.nome) }}</span>

            <div class="min-w-0">
              <p class="font-mono text-sm text-primary">{{ pal.nome }}</p>
              <p class="font-mono text-xs text-fg-dim">{{ pal.cargo }}</p>
            </div>
          </div>

          <p class="mt-3 text-sm text-fg-muted">{{ pal.bio }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
