<script setup lang="ts">
/** "Ajude a construir o próximo": palestrante, local ou apoio. */
const nome = ref('')
const email = ref('')
const mensagem = ref('')
const como = ref<string[]>([])

const opcoes = [
  { valor: 'palestrante', rotulo: 'indicar um palestrante', ajuda: 'alguém que você quer ouvir — daqui ou de fora' },
  { valor: 'local', rotulo: 'oferecer um local', ajuda: 'empresa, universidade, coworking, café…' },
  { valor: 'apoio', rotulo: 'apoiar com coffee break ou brindes', ajuda: 'sua empresa ou uma que você indica' },
]

// quem chega pelo link "indicar palestrantes" já encontra a opção marcada
const preSelecao = usePreSelecaoAjuda()
watch(preSelecao, (valor) => {
  if (valor && !como.value.includes(valor)) como.value.push(valor)
}, { immediate: true })

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
const valido = computed(
  () => nome.value.trim().length >= 2 && emailOk.value && como.value.length > 0,
)

const montar = () => ({
  tipo: 'ajuda',
  nome: nome.value.trim(),
  email: email.value.trim(),
  como: como.value.join(', '),
  mensagem: mensagem.value.trim(),
})

function limpar() {
  nome.value = ''
  email.value = ''
  mensagem.value = ''
  como.value = []
  preSelecao.value = null
}
</script>

<template>
  <FormBase
    arquivo="ajudar.sh"
    comando="devpp contribuir"
    rotulo="quero ajudar"
    titulo-sucesso="Recebido. Obrigado mesmo."
    :valido="valido"
    :montar="montar"
    @enviado="limpar"
  >
    <fieldset>
      <legend class="font-mono text-xs text-fg-muted">como você pode ajudar</legend>
      <div class="mt-2 space-y-2">
        <label
          v-for="o in opcoes"
          :key="o.valor"
          class="flex cursor-pointer items-start gap-3 border border-line-soft p-4 transition-colors hover:border-line"
        >
          <input
            v-model="como"
            type="checkbox"
            :value="o.valor"
            class="mt-0.5 size-4 shrink-0 accent-[var(--primary)]"
          >
          <span class="font-mono text-sm">
            {{ o.rotulo }}
            <span class="block text-xs text-fg-dim">{{ o.ajuda }}</span>
          </span>
        </label>
      </div>
    </fieldset>

    <CampoTexto
      id="aju-nome"
      v-model="nome"
      rotulo="nome"
      placeholder="como te chamam"
      autocomplete="name"
    />
    <CampoTexto
      id="aju-email"
      v-model="email"
      rotulo="e-mail"
      type="email"
      autocomplete="email"
      placeholder="voce@dominio.com"
    />
    <CampoTexto
      id="aju-msg"
      v-model="mensagem"
      rotulo="conta mais (opcional)"
      :linhas="3"
      placeholder="quem, onde, o quê — do jeito que der."
    />

    <template #sucesso>
      A organização entra em contato pelo e-mail que você deixou — sem SLA, mas com
      carinho. Encontro do DEV-PP existe porque alguém ofereceu palestra, espaço ou café.
    </template>
    <template #rodape>
      sem compromisso — dá pra recuar depois sem problema nenhum
    </template>
  </FormBase>
</template>
