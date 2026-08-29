<script setup lang="ts">
const passos = [
  {
    cmd: 'entrar',
    titulo: 'Junte-se a nós',
    texto: 'Siga-nos nas redes sociais, entre em nossas comunidades e canais.',
  },
  {
    cmd: 'aguardar',
    titulo: 'Fique ligado',
    texto: 'Nós divulgamos nossos meetups e vc fica sabendo.',
  },
  {
    cmd: 'aparecer',
    titulo: 'Você aparece no dia',
    texto: 'Chega, pega o cafezinho, conversa com a galera, senta com quem você só conhecia no Whatsapp.',
  },
  {
    cmd: 'repetir',
    titulo: 'E de novo no próximo',
    texto: 'O DEV-PP não é um evento avulso: acontece sempre (ou quase sempre), com a mesma galera crescendo junto.',
  },
]

const sessao = [
  { cmd: 'devpp entrar --canal whatsapp', saida: '✓ você agora faz parte da comunidade', tom: 'ok' },
  { cmd: 'devpp agenda --watch', saida: '… esperando o próximo meetup ser anunciado', tom: 'espera' },
  { cmd: 'devpp aparecer --local "inova prudente"', saida: '✓ 24/09, 18h. leva sede.', tom: 'ok' },
  { cmd: 'devpp repetir', saida: '∞ tem sempre um próximo', tom: 'espera' },
]

const tons: Record<string, string> = {
  ok: 'text-primary',
  espera: 'text-fg-dim',
}
</script>

<template>
  <section class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead comando="devpp --help" titulo="Como participar">
        <template #descricao>
          Não tem burocracia nenhuma:
          <strong class="font-semibold text-primary">é só chegar</strong>.
          Mas você pode garantir a sua vaga se inscrevendo.
        </template>
      </UiSectionHead>

      <ol class="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(p, i) in passos" :key="p.cmd" class="bg-bg p-7">
          <p class="font-mono text-[0.72rem] text-fg-dim">
            // PASSO {{ String(i + 1).padStart(2, '0') }}
          </p>
          <p class="mt-4 font-mono text-sm text-primary">$ {{ p.cmd }}</p>
          <h3 class="mt-2 text-xl">{{ p.titulo }}</h3>
          <p class="mt-2 text-sm text-fg-muted">{{ p.texto }}</p>
        </li>
      </ol>

      <div class="mx-auto mt-14 max-w-3xl">
        <p class="text-center font-mono text-sm text-fg-dim">
          // Se vc preferir, use a nossa CLI
        </p>

        <UiTerminalWindow class="mt-4" estilo="mac" titulo="dev@pp — zsh — 80×18">
          <div class="overflow-x-auto p-6 font-mono text-[0.82rem] leading-relaxed">
            <div v-for="linha in sessao" :key="linha.cmd" class="mb-3 last:mb-0">
              <p class="whitespace-nowrap">
                <UiPrompt />{{ ' ' }}<span class="text-fg">{{ linha.cmd }}</span>
              </p>
              <p class="whitespace-nowrap" :class="tons[linha.tom]">{{ linha.saida }}</p>
            </div>

            <p class="mt-4 whitespace-nowrap caret">
              <UiPrompt />
            </p>
          </div>
        </UiTerminalWindow>
      </div>
    </div>
  </section>
</template>
