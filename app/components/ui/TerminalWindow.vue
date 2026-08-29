<script setup lang="ts">
withDefaults(
  defineProps<{
    titulo?: string
    scanlines?: boolean
    /** 'mac' desenha a janela como um Terminal de verdade: botões coloridos e título centralizado. */
    estilo?: 'padrao' | 'mac'
  }>(),
  { estilo: 'padrao' },
)
</script>

<template>
  <div
    class="win relative"
    :class="[scanlines && 'scanlines', estilo === 'mac' && 'shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]']"
  >
    <!-- janela estilo Terminal do macOS -->
    <div v-if="estilo === 'mac'" class="win-bar relative justify-center">
      <div class="absolute left-3 flex gap-2">
        <span class="size-3 rounded-full" style="background:#ff5f57" />
        <span class="size-3 rounded-full" style="background:#febc2e" />
        <span class="size-3 rounded-full" style="background:#28c840" />
      </div>
      <span class="truncate px-16 text-fg-muted">{{ titulo ?? 'dev@pp — zsh' }}</span>
    </div>

    <div v-else class="win-bar">
      <span class="win-dot" />
      <span class="win-dot" />
      <span class="win-dot" />
      <span class="ml-2 truncate">{{ titulo ?? 'dev@pp:~' }}</span>
    </div>

    <div class="relative">
      <slot />
    </div>
  </div>
</template>
