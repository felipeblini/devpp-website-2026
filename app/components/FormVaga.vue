<script setup lang="ts">
import type { Meetup } from '#shared/meetups'
import { inscricaoExterna } from '#shared/meetups'

/**
 * Inscrição num encontro marcado. Só faz sentido quando existe data.
 * Com `inscricoes.provedor` diferente de 'form', a inscrição acontece no
 * parceiro: mesma janela, sem campos, botão vai pra URL dele.
 */
const props = defineProps<{ meetup: Meetup }>()

const externa = computed(() => inscricaoExterna(props.meetup))
const comando = computed(() => `devpp inscrever --meetup #${props.meetup.numero}`)

const nome = ref('')
const email = ref('')

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
const valido = computed(() => nome.value.trim().length >= 2 && emailOk.value)

const montar = () => ({
  tipo: 'inscricao',
  nome: nome.value.trim(),
  email: email.value.trim(),
  meetup: props.meetup.slug,
  numero: props.meetup.numero,
})

function limpar() {
  nome.value = ''
  email.value = ''
}
</script>

<template>
  <!-- ---------- inscrição no parceiro ---------- -->
  <UiTerminalWindow v-if="externa" titulo="inscricao.sh">
    <div class="space-y-5 p-6 sm:p-8">
      <p class="font-mono text-sm text-fg-muted">
        <UiPrompt />{{ ' ' }}{{ comando }}
      </p>

      <div class="space-y-3 text-sm text-fg-muted">
        <p>
          As inscrições desse meetup são feitas pelo
          <strong class="font-semibold text-fg">{{ externa.provedor }}</strong>.
          É rapidinho: o botão abaixo abre a página do evento, você confirma
          presença lá e pronto — a vaga é sua.
        </p>
        <p class="font-mono text-xs text-fg-dim">
          // a lista de presença e os sorteios de brindes saem de lá.
        </p>
      </div>

      <AppButton :href="externa.url!" class="w-full">
        <UiIcone nome="commit" />
        garantir minha vaga ↗
      </AppButton>

      <p class="font-mono text-[0.68rem] text-fg-dim">
        abre em uma nova aba, no site do {{ externa.provedor }}
      </p>
    </div>
  </UiTerminalWindow>

  <!-- ---------- formulário do próprio site ---------- -->
  <FormBase
    v-else
    arquivo="inscricao.sh"
    :comando="comando"
    rotulo="garantir minha vaga"
    titulo-sucesso="Tá valendo. Te vemos lá."
    :valido="valido"
    :montar="montar"
    @enviado="limpar"
  >
    <CampoTexto
      id="vaga-nome"
      v-model="nome"
      rotulo="nome"
      placeholder="como te chamam"
      autocomplete="name"
    />
    <CampoTexto
      id="vaga-email"
      v-model="email"
      rotulo="e-mail"
      type="email"
      autocomplete="email"
      placeholder="voce@dominio.com"
      ajuda="só pra confirmar a vaga e avisar se algo mudar de última hora."
    />

    <template #icone>
      <UiIcone nome="commit" />
    </template>

    <template #sucesso>
      Sua vaga no <strong class="text-fg">meetup #{{ meetup.numero }}</strong> está garantida.
      Agora é só não dar merge na sexta e aparecer. Se mudar alguma coisa de última
      hora, a gente te avisa por e-mail.
    </template>
    <template #rodape>
      a gente não repassa seu e-mail pra ninguém
    </template>
  </FormBase>
</template>
