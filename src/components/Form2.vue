<template>
  <div>
    <div v-for="item in list" :key="item.name">
      <div v-if="item.name === 'recommend'">
        <input v-model="definedFieldMap.hasRecommended[0].value" type="radio" name="huey" :value="true" />
        <input v-model="definedFieldMap.hasRecommended[0].value" type="radio" name="huey" :value="false" />
        <input placeholder="recommendation" v-model="definedFieldMap.recommendation[0].value" />
      </div>
      <Field v-else v-model="definedFieldMap[item.name][0].value" :name="item.name" :error-message="errors[item.name]" />
    </div>

    <h4>values: {{ values }}</h4>
    <h4>errors: {{ errors }}</h4>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'

import Field from './Field2.vue'
import type { FormValues2 } from '../types/common'
import { computed } from 'vue'

const list = [{ name: 'name' as const }, { name: 'email' as const }, { name: 'recommend' as const }]

const formInitValues = computed(() => ({
  name: '',
  email: '',
  hasRecommended: false,
  recommendation: '',
}))

const { values, errors, defineField, submitForm } = useForm<FormValues2>({
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email must be valid').required('Email is required'),
    hasRecommended: yup.boolean().required('Recommendation is required'),
    recommendation: yup.string().when('hasRecommended', {
      is: true,
      then: schema => schema.required('Recommendation is required'),
      otherwise: schema => schema.notRequired(),
    }),
  }),
  initialValues: formInitValues.value,
})

const definedFieldMap = computed(() =>
  (Object.keys(formInitValues.value) as (keyof FormValues2)[]).reduce((acc, fieldName) => {
    acc[fieldName] = defineField(fieldName)
    return acc
  }, {} as Record<keyof FormValues2, ReturnType<typeof defineField>>)
)
</script>

<style scoped></style>
