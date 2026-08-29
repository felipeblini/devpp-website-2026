<script setup lang="ts">
const passos = [
  {
    cmd: 'entrar',
    titulo: 'Junte-se a nós',
    texto: 'Siga-nos nas redes sociais, entre em nossas comunidades e canais.',
    saida: '✓ você agora faz parte da comunidade',
    tom: 'ok',
    args: ' --canal whatsapp|facebook|instagram',
  },
  {
    cmd: 'aguardar',
    titulo: 'Fique ligado',
    texto: 'Nós divulgamos nossos meetups e vc fica sabendo.',
    saida: '… esperando o próximo meetup ser anunciado',
    tom: 'espera',
    args: ' --watch',
  },
  {
    cmd: 'chamar',
    titulo: 'Chame a galera',
    texto: 'Marca aquele colega que vive dizendo que quer ir. Meetup bom é meetup cheio.',
    saida: '✓ convite enviado pra quem você marcou',
    tom: 'ok',
    args: ' --todos',
  },
  {
    cmd: 'aparecer',
    titulo: 'Você aparece no dia',
    texto: 'Chega, pega o cafezinho, conversa com a galera, senta com quem você só conhecia no Whatsapp.',
    saida: '✓ Bem-vindo, fique à vontade',
    tom: 'ok',
    args: ' --local',
  },
  {
    cmd: 'repetir',
    titulo: 'E de novo no próximo',
    texto: 'O DEV-PP não é um evento avulso: acontece sempre (ou quase sempre), com a mesma galera crescendo junto.',
    saida: '∞ tem sempre um próximo',
    tom: 'espera',
    args: '',
  },
]

const tons: Record<string, string> = {
  ok: 'text-primary',
  espera: 'text-fg-dim',
}

const numero = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section class="border-b border-line-soft bg-bg-deep">
    <div class="mx-auto max-w-6xl px-5 py-20 lg:py-24">
      <UiSectionHead comando="devpp --help" titulo="Como participar">
        <template #descricao>
          Não tem burocracia nenhuma:
          <strong class="font-semibold text-primary">é só chegar</strong>.
        </template>
      </UiSectionHead>

      <ol class="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="(p, i) in passos" :key="p.cmd" class="bg-bg p-6">
          <p class="font-mono text-[0.72rem] text-fg-dim">// PASSO {{ numero(i) }}</p>
          <p class="mt-4 font-mono text-sm text-primary">$ {{ p.cmd }}</p>
          <h3 class="mt-2 text-lg leading-tight">{{ p.titulo }}</h3>
          <p class="mt-2 text-sm text-fg-muted">{{ p.texto }}</p>
        </li>
      </ol>

      <div class="mx-auto mt-14 max-w-3xl">
        <p class="text-center font-mono text-sm text-fg-dim">
          // Se vc preferir, use a nossa CLI
        </p>

        <UiTerminalWindow class="mt-4" estilo="mac" titulo="dev@pp — zsh — 80×18">
          <div class="overflow-x-auto p-6 font-mono text-[0.82rem] leading-relaxed">
            <div v-for="(p, i) in passos" :key="p.cmd" class="mb-4 last:mb-0">
              <p class="whitespace-nowrap text-fg-dim">## PASSO {{ numero(i) }}</p>
              <p class="whitespace-nowrap">
                <UiPrompt />{{ ' ' }}<span class="text-fg">devpp {{ p.cmd }}{{ p.args }}</span>
              </p>
              <p class="whitespace-nowrap" :class="tons[p.tom]">{{ p.saida }}</p>
            </div>
          </div>
        </UiTerminalWindow>
      </div>
    </div>
  </section>
</template>
