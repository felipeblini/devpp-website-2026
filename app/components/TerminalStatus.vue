<script setup lang="ts">
/**
 * Janela de terminal com um comando e a saída em pares rótulo … valor,
 * no mesmo formato em todo o site (status da comunidade, detalhes do meetup).
 */
export interface LinhaStatus {
  rotulo: string
  /** null = valor ainda não definido: mostra os pontinhos animados. */
  valor: string | null
  /** texto exibido enquanto o valor é null */
  carregando?: string
  tom?: 'primary' | 'accent' | 'muted'
}

withDefaults(
  defineProps<{
    titulo?: string
    caminho?: string
    comando: string
    linhas: LinhaStatus[]
  }>(),
  { titulo: 'dev@pp — zsh — ~/comunidade', caminho: '~/comunidade' },
)

const tons: Record<string, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  muted: 'text-fg-muted',
}

const atraso = (i: number) => `${180 + i * 110}ms`
</script>

<template>
  <UiTerminalWindow estilo="mac" :titulo="titulo" scanlines>
    <div class="p-5 font-mono text-[0.82rem] leading-relaxed">
      <p class="text-fg-muted">
        <UiPrompt :caminho="caminho" />{{ ' ' }}{{ comando }}
      </p>
      <dl class="mt-3 space-y-1.5">
        <div
          v-for="(l, i) in linhas"
          :key="l.rotulo"
          class="flex items-baseline gap-2 opacity-0 [animation:fade-in_.4s_ease-out_forwards]"
          :style="{ animationDelay: atraso(i) }"
        >
          <dt class="shrink-0 text-fg-dim">{{ l.rotulo }}</dt>
          <span aria-hidden="true" class="min-w-4 flex-1 self-center border-b border-dotted border-line" />
          <dd class="min-w-0 text-right font-bold" :class="l.valor === null ? 'text-fg-muted' : tons[l.tom ?? 'muted']">
            <span v-if="l.valor !== null">{{ l.valor }}</span>
            <UiCarregando v-else :texto="l.carregando" />
          </dd>
        </div>
      </dl>
      <slot />
      <p
        class="mt-4 caret opacity-0 [animation:fade-in_.4s_ease-out_forwards]"
        :style="{ animationDelay: atraso(linhas.length + 2) }"
      >
        <UiPrompt :caminho="caminho" />
      </p>
    </div>
  </UiTerminalWindow>
</template>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: none; }
}
</style>
