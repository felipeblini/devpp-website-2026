<script setup lang="ts">
withDefaults(defineProps<{ texto?: string }>(), { texto: 'loading' })
</script>

<template>
  <span class="whitespace-nowrap">{{ texto }}<span
    class="pontinhos"
    aria-hidden="true"
  ><span>.</span><span>.</span><span>.</span></span><span class="sr-only">…</span></span>
</template>

<style scoped>
.pontinhos > span {
  animation: pisca 1.35s steps(1) infinite;
}
.pontinhos > span:nth-child(2) { animation-delay: 0.45s; }
.pontinhos > span:nth-child(3) { animation-delay: 0.9s; }

@keyframes pisca {
  0%, 33%  { opacity: 0.15; }
  34%, 100% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .pontinhos > span { animation: none; opacity: 1; }
}
</style>
