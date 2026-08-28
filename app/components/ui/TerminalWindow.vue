<script setup lang="ts">
defineProps<{
  titulo?: string
  scanlines?: boolean
}>()
</script>

<template>
  <div class="win relative" :class="scanlines && 'scanlines'">
    <div class="win-bar">
      <span class="win-dot" />
      <span class="win-dot" />
      <span class="win-dot" />
      <span class="ml-2 truncate">{{ titulo ?? 'devpp@prudente:~' }}</span>
    </div>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
