<script setup lang="ts">
const props = withDefaults(defineProps<{ meetup?: string }>(), { meetup: '2026-09-24' })

const nome = ref('')
const email = ref('')
const querPalestrar = ref(false)
const tema = ref('')
const honeypot = ref('')

const estado = ref<'parado' | 'enviando' | 'ok' | 'erro'>('parado')
const erro = ref('')

const emailValido = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
const podeEnviar = computed(
  () => nome.value.trim().length >= 2 && emailValido.value && estado.value !== 'enviando',
)

async function enviar() {
  if (!podeEnviar.value) return
  estado.value = 'enviando'
  erro.value = ''
  try {
    await $fetch('/api/inscricao', {
      method: 'POST',
      body: {
        nome: nome.value.trim(),
        email: email.value.trim(),
        querPalestrar: querPalestrar.value,
        tema: querPalestrar.value ? tema.value.trim() : '',
        meetup: props.meetup,
        website: honeypot.value, // armadilha de bot
      },
    })
    estado.value = 'ok'
  }
  catch (e: any) {
    estado.value = 'erro'
    erro.value = e?.data?.message || 'Não deu pra enviar agora. Tenta de novo em instantes.'
  }
}
</script>

<template>
  <UiTerminalWindow titulo="inscricao.sh">
    <div class="p-6 sm:p-8">
      <!-- sucesso -->
      <div v-if="estado === 'ok'" class="font-mono">
        <p class="text-primary">
          <span class="text-fg-dim">$</span> inscricao --confirmada
        </p>
        <p class="mt-4 text-2xl font-extrabold">Tá valendo. Te vemos dia 24.</p>
        <p class="mt-3 text-sm text-fg-muted">
          Anota <strong class="text-fg">24/09/2026</strong> na agenda. Assim que o local e
          o horário fecharem, o aviso vai pro <strong class="text-fg">{{ email }}</strong>.
        </p>
        <p v-if="querPalestrar" class="mt-3 text-sm text-accent">
          // sua proposta de palestra também chegou — a gente responde por e-mail.
        </p>
        <button
          class="mt-6 font-mono text-sm text-primary underline underline-offset-4"
          @click="estado = 'parado'; nome = ''; email = ''; tema = ''; querPalestrar = false"
        >
          inscrever outra pessoa
        </button>
      </div>

      <!-- formulário -->
      <form v-else class="space-y-5" novalidate @submit.prevent="enviar">
        <p class="font-mono text-sm text-fg-dim">
          <span class="text-primary">$</span> devpp inscrever --meetup {{ meetup }}
        </p>

        <div>
          <label for="nome" class="block font-mono text-xs text-fg-muted">nome</label>
          <input
            id="nome"
            v-model="nome"
            type="text"
            autocomplete="name"
            required
            placeholder="como te chamam"
            class="mt-1.5 w-full border border-line bg-bg px-4 py-3 font-mono text-sm text-fg placeholder:text-fg-dim focus:border-primary focus:outline-none"
          >
        </div>

        <div>
          <label for="email" class="block font-mono text-xs text-fg-muted">e-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            placeholder="voce@dominio.com"
            class="mt-1.5 w-full border border-line bg-bg px-4 py-3 font-mono text-sm text-fg placeholder:text-fg-dim focus:border-primary focus:outline-none"
          >
          <p class="mt-1.5 font-mono text-[0.68rem] text-fg-dim">
            só pra avisar de local, horário e próximos meetups. Nada além disso.
          </p>
        </div>

        <label class="flex cursor-pointer items-start gap-3 border border-line-soft p-4">
          <input
            v-model="querPalestrar"
            type="checkbox"
            class="mt-0.5 size-4 shrink-0 accent-[var(--primary)]"
          >
          <span class="font-mono text-sm">
            quero palestrar
            <span class="block text-xs text-fg-dim">a chamada está aberta pro dia 24</span>
          </span>
        </label>

        <div v-if="querPalestrar">
          <label for="tema" class="block font-mono text-xs text-fg-muted">sobre o quê?</label>
          <textarea
            id="tema"
            v-model="tema"
            rows="3"
            placeholder="tema, formato e um resumo de 2 linhas"
            class="mt-1.5 w-full border border-line bg-bg px-4 py-3 font-mono text-sm text-fg placeholder:text-fg-dim focus:border-primary focus:outline-none"
          />
        </div>

        <!-- honeypot: invisível pra humano -->
        <div class="absolute -left-[5000px]" aria-hidden="true">
          <label>Não preencha<input v-model="honeypot" type="text" tabindex="-1" autocomplete="off"></label>
        </div>

        <AppButton type="submit" :disabled="!podeEnviar" class="w-full">
          {{ estado === 'enviando' ? 'enviando…' : 'garantir minha vaga' }}
        </AppButton>

        <p v-if="estado === 'erro'" class="border border-danger px-4 py-3 font-mono text-sm text-danger">
          ✗ {{ erro }}
          <span class="mt-1 block text-fg-muted">
            Se insistir, manda direto pra
            <a href="mailto:devpporg@gmail.com" class="underline">devpporg@gmail.com</a>.
          </span>
        </p>

        <p class="font-mono text-[0.68rem] text-fg-dim">
          gratuito · sem cadastro · a gente não repassa seu e-mail pra ninguém
        </p>
      </form>
    </div>
  </UiTerminalWindow>
</template>
