<template>
  <div>
    <label :for="field.name">{{ field.label }}</label>
    <template v-if="field.type === 'select'">
      <select v-model="field.value.value">
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </template>
    <template v-else-if="field.type === 'text'">
      <input type="text" v-model="field.value.value" />
    </template>
    <template v-else-if="field.type === 'date'">
      <input type="date" v-model="field.value.value" />
    </template>
    <template v-else-if="field.type === 'checkbox'">
      <input type="checkbox" v-model="field.value.value" />
    </template>
    <div v-if="field.errorMessage" class="error">{{ field.errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

const props = defineProps<{ field: any }>()

watchEffect(() => {
  console.log('== field ==', props.field)
})
</script>
