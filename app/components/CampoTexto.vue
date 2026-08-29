<script setup lang="ts">
defineProps<{
  id: string
  rotulo: string
  ajuda?: string
  placeholder?: string
  type?: string
  autocomplete?: string
  linhas?: number
}>()
const modelo = defineModel<string>({ required: true })
const classe =
  'mt-1.5 w-full border border-line bg-bg px-4 py-3 font-mono text-sm text-fg placeholder:text-fg-dim focus:border-primary focus:outline-none'
</script>

<template>
  <div>
    <label :for="id" class="block font-mono text-xs text-fg-muted">{{ rotulo }}</label>
    <textarea
      v-if="linhas"
      :id="id"
      v-model="modelo"
      :rows="linhas"
      :placeholder="placeholder"
      :class="classe"
    />
    <input
      v-else
      :id="id"
      v-model="modelo"
      :type="type ?? 'text'"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :class="classe"
    >
    <p v-if="ajuda" class="mt-1.5 font-mono text-[0.68rem] text-fg-dim">{{ ajuda }}</p>
  </div>
</template>
