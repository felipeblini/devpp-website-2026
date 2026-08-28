<script setup lang="ts">
const redes = [
  { label: 'instagram', href: 'https://www.instagram.com/devpp.com.br/' },
  { label: 'facebook', href: 'https://www.facebook.com/devppoficial' },
  { label: 'youtube', href: 'https://www.youtube.com/@dev-pp5576' },
  { label: 'github', href: 'https://github.com/dev-pp' },
]
const ano = new Date().getFullYear()
</script>

<template>
  <footer class="bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-14">
      <div class="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <p class="flex items-center gap-2">
            <span aria-hidden="true" class="font-mono text-lg font-bold text-primary">$</span>
            <img
              src="/img/devpp-logo.png"
              alt="DEV-PP"
              width="366"
              height="80"
              class="h-7 w-auto [image-rendering:pixelated]"
            >
            <span aria-hidden="true" class="caret" />
          </p>
          <p class="mt-4 max-w-xs font-mono text-sm text-fg-muted">
            Comunidade de desenvolvedores de Presidente Prudente e região.
            Desde 2019.
          </p>
          <a
            href="mailto:devpporg@gmail.com"
            class="mt-4 inline-block font-mono text-sm text-primary underline underline-offset-4"
          >devpporg@gmail.com</a>
        </div>

        <div class="flex gap-12">
          <div>
            <p class="pixel text-[0.6rem] text-fg-dim">redes</p>
            <ul class="mt-4 space-y-2 font-mono text-sm">
              <li v-for="r in redes" :key="r.href">
                <a
                  :href="r.href"
                  target="_blank"
                  rel="noopener"
                  class="text-fg-muted transition-colors hover:text-primary"
                >{{ r.label }} ↗</a>
              </li>
            </ul>
          </div>
          <div>
            <p class="pixel text-[0.6rem] text-fg-dim">comunidade</p>
            <ul class="mt-4 space-y-2 font-mono text-sm">
              <li>
                <a href="/#meetup" class="text-fg-muted transition-colors hover:text-primary">próximo meetup</a>
              </li>
              <li>
                <a href="/#palestrar" class="text-fg-muted transition-colors hover:text-primary">palestrar</a>
              </li>
              <li>
                <a href="https://github.com/dev-pp/vagas/issues" target="_blank" rel="noopener" class="text-fg-muted transition-colors hover:text-primary">vagas ↗</a>
              </li>
              <li>
                <NuxtLink to="/codigo-de-conduta" class="text-fg-muted transition-colors hover:text-primary">código de conduta</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p class="mt-12 border-t border-line-soft pt-6 font-mono text-xs text-fg-dim">
        <span class="text-primary">$</span> echo "feito pela comunidade, pra comunidade" &nbsp;·&nbsp; DEV-PP {{ ano }}
      </p>
    </div>
  </footer>
</template>
