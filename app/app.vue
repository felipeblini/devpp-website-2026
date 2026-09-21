<script setup lang="ts">
// A página da bio (/links) é só os botões: sem menu no topo nem o rodapé grande
// (ela tem um rodapé próprio, de uma linha).
const route = useRoute()
const pagLinks = computed(() => route.path.replace(/\/$/, '') === '/links')
</script>

<template>
  <div class="min-h-dvh bg-bg text-fg antialiased">
    <NuxtRouteAnnouncer />
    <SiteHeader v-if="!pagLinks" />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter v-if="!pagLinks" />
  </div>
</template>
