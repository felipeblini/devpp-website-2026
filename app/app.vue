<script setup lang="ts">
// A página da bio (/links) é só os botões: sem menu no topo.
const route = useRoute()
const semMenu = computed(() => route.path.replace(/\/$/, '') === '/links')
</script>

<template>
  <div class="min-h-dvh bg-bg text-fg antialiased">
    <NuxtRouteAnnouncer />
    <SiteHeader v-if="!semMenu" />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
