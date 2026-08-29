<script setup lang="ts">
/**
 * Prompt de shell no padrão usuário@host:caminho$ — o mesmo em todo o site.
 */
withDefaults(
  defineProps<{ host?: string; caminho?: string }>(),
  { host: 'dev@pp', caminho: '~' },
)
</script>

<template>
  <span class="whitespace-nowrap"><span class="text-primary">{{ host }}</span><span class="text-fg-dim">:</span><span class="text-accent">{{ caminho }}</span><span class="text-fg-muted">$</span></span>
</template>
