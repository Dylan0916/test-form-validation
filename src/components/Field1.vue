<template>
  <div>
    <div v-if="isMatchingKey(props.item.name, 'name', value)">
      <input v-model="value" />
      <p>name error: {{ errorMessage }}</p>
    </div>
    <div v-if="isMatchingKey(props.item.name, 'email', value)">
      <input v-model="value" />
      <p>email error: {{ errorMessage }}</p>
    </div>
    <div v-else-if="isMatchingKey(props.item.name, 'recommend', value)">
      <input v-model="value.hasRecommended" type="radio" name="huey" :value="true" />
      <input v-model="value.hasRecommended" type="radio" name="huey" :value="false" />
      <input placeholder="recommendation" v-model="value.recommendation" />
      <input v-model="value.requiredField" placeholder="requiredField" />
      <p>recommend error: {{ errorMessage }}</p>
    </div>
    <!-- <p>errors: {{ errorMessage }}</p> -->
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'

import type { FormValues } from '../types/common'
import { computed } from 'vue'

type Nested = { name: string; nested?: Nested[] }
type Item = { name: keyof FormValues; nested?: Nested[] }

interface Props {
  item: Item
}

const props = defineProps<Props>()
const { value, errorMessage, errors } = useField(props.item.name)

function isMatchingKey<K extends keyof FormValues>(actual: keyof FormValues, expected: K, value: unknown): value is FormValues[K] {
  return actual === expected
}
</script>

<style></style>
