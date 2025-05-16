<template>
  <form @submit.prevent="onSubmit">
    <FormField v-for="field in fields" :key="field.name" :field="field" />
    <p>{{ values }}</p>
    <button type="submit">送出</button>
    <div v-if="success" class="success">success</div>
  </form>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useFormFields } from '@/composables/useFormFields'
import FormField from '@/components/FormField.vue'

const { values, fields, errors, handleSubmit } = useFormFields()
const success = ref(false)

watchEffect(() => {
  console.log('== errors ==', errors.value)
})

const onSubmit = handleSubmit(values => {
  console.log('== form values ==', values)
  success.value = true
})
</script>

<style scoped></style>
