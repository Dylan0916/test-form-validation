<template>
  <div class="form-field">
    <label :for="name">{{ label }}</label>
    <select v-if="typeValue === 'select'" :id="name" v-model="value" :class="{ 'error-border': errorMessage }">
      <option value="" disabled>請選擇</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <input v-else v-bind="inputProps" :id="name" v-model="value" :class="{ 'error-border': errorMessage }" @change="onChange" />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useField } from 'vee-validate'

interface Props {
  name: string
  label: string
  type?: string
  options?: Array<{ label: string; value: any }>
}
const props = defineProps<Props>()
const { name, label, type, options } = toRefs(props)

const { value, errorMessage } = useField(name.value)

const typeValue = computed(() => type.value || 'text')

const inputProps = computed(() => {
  if (typeValue.value === 'select') {
    return { name: name.value }
  }
  if (typeValue.value === 'checkbox') {
    return { type: 'checkbox', name: name.value }
  }
  if (typeValue.value === 'date') {
    return { type: 'date', name: name.value }
  }
  return { type: typeValue.value, name: name.value }
})

function onChange(e: Event) {
  if (typeValue.value === 'checkbox') {
    value.value = (e.target as HTMLInputElement).checked
  }
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
}
.error-border {
  border: 1px solid #e53935 !important;
}
.error-message {
  color: #e53935;
  font-size: 0.9em;
  margin-top: 0.2em;
}
</style>
