<template>
  <div>
    <p v-if="isMatchingKey(props.name, 'name', value)">{{ value.includes }}</p>
    <p v-if="isMatchingKey(props.name, 'email', value)">{{ value.includes }}</p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

interface FormValues {
  name: string
  email: string
  recommend: {
    hasRecommended: boolean
    recommendation: string
  }
}

const props = defineProps<{ name: keyof FormValues }>()

const { value } = useField<FormValues[keyof FormValues]>(props.name)

function isMatchingKey<K extends keyof FormValues>(actual: keyof FormValues, expected: K, value: unknown): value is FormValues[K] {
  return actual === expected
}
</script>
