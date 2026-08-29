<script setup lang="ts">
/**
 * Casca comum dos formulários: janela de terminal, estado de envio,
 * mensagem de sucesso e tratamento de erro. Cada formulário injeta
 * os próprios campos pelo slot e o payload pela prop `montar`.
 */
const props = defineProps<{
  arquivo: string
  comando: string
  rotulo: string
  tituloSucesso: string
  valido: boolean
  montar: () => Record<string, unknown>
}>()

const emit = defineEmits<{ enviado: [] }>()

const estado = ref<'parado' | 'enviando' | 'ok' | 'erro'>('parado')
const erro = ref('')
const honeypot = ref('')

async function enviar() {
  if (!props.valido || estado.value === 'enviando') return
  estado.value = 'enviando'
  erro.value = ''
  try {
    await $fetch('/api/mensagem', {
      method: 'POST',
      body: { ...props.montar(), website: honeypot.value },
    })
    estado.value = 'ok'
    emit('enviado')
  }
  catch (e: any) {
    estado.value = 'erro'
    erro.value = e?.data?.message || 'Não deu pra enviar agora. Tenta de novo em instantes.'
  }
}

function reiniciar() {
  estado.value = 'parado'
}
</script>

<template>
  <UiTerminalWindow :titulo="arquivo">
    <div class="p-6 sm:p-8">
      <div v-if="estado === 'ok'" class="font-mono">
        <p class="text-primary">
          <span class="text-fg-dim">$</span> {{ comando }} --ok
        </p>
        <p class="mt-4 text-2xl font-extrabold">{{ tituloSucesso }}</p>
        <div class="mt-3 text-sm text-fg-muted">
          <slot name="sucesso" />
        </div>
        <button
          class="mt-6 font-mono text-sm text-primary underline underline-offset-4"
          @click="reiniciar"
        >
          mandar outra
        </button>
      </div>

      <form v-else class="space-y-5" novalidate @submit.prevent="enviar">
        <p class="font-mono text-sm text-fg-dim">
          <span class="text-primary">$</span> {{ comando }}
        </p>

        <slot />

        <div class="absolute -left-[5000px]" aria-hidden="true">
          <label>Não preencha<input v-model="honeypot" type="text" tabindex="-1" autocomplete="off"></label>
        </div>

        <AppButton type="submit" :disabled="!valido || estado === 'enviando'" class="w-full">
          {{ estado === 'enviando' ? 'enviando…' : rotulo }}
        </AppButton>

        <p v-if="estado === 'erro'" class="border border-danger px-4 py-3 font-mono text-sm text-danger">
          ✗ {{ erro }}
          <span class="mt-1 block text-fg-muted">
            Se insistir, manda direto pra
            <a href="mailto:devpporg@gmail.com" class="underline">devpporg@gmail.com</a>.
          </span>
        </p>

        <p class="font-mono text-[0.68rem] text-fg-dim">
          <slot name="rodape">a gente não repassa o seu e-mail pra ninguém</slot>
        </p>
      </form>
    </div>
  </UiTerminalWindow>
</template>
