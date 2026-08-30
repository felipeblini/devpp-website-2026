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
                <a href="/#meetups" class="text-fg-muted transition-colors hover:text-primary">próximo meetup</a>
              </li>
              <li>
                <a href="/#palestrar" class="text-fg-muted transition-colors hover:text-primary">palestrar</a>
              </li>
              <li>
                <a href="/#ajudar" class="text-fg-muted transition-colors hover:text-primary">ajudar</a>
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

      <div class="mt-12 flex flex-col gap-4 border-t border-line-soft pt-6 font-mono text-xs text-fg-dim sm:flex-row sm:items-center sm:justify-between">
        <p>
          <UiPrompt />{{ ' ' }}echo "feito pela comunidade, pra comunidade" &nbsp;·&nbsp; DEV-PP {{ ano }}
        </p>

        <a
          href="https://github.com/felipeblini/devpp-website-2026"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
          </svg>
          o código deste site é aberto: colabore se quiser
        </a>
      </div>
    </div>
  </footer>
</template>
