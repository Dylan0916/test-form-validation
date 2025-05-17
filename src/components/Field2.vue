<template>
  <div>
    <div v-if="props.name === 'name' || props.name === 'email'">
      <input v-model="value" />
      <p>{{ props.name }} error: {{ props.errorMessage }}</p>
    </div>
    <!--
    <div v-else-if="isMatchingKey(props.item.name, 'recommend', value)">
      <input v-model="value.hasRecommended" type="radio" name="huey" :value="true" />
      <input v-model="value.hasRecommended" type="radio" name="huey" :value="false" />
      <input placeholder="recommendation" v-model="value.recommendation" />
      <p>recommend error: {{ errorMessage }}</p>
    </div> -->
    <!-- <p>errors: {{ errorMessage }}</p> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'

import type { FormValues } from '../types/common'

interface Props {
  name: keyof FormValues
  errorMessage?: string
}

const props = defineProps<Props>()

const value = defineModel<any>({ required: true })
</script>

<style></style>
