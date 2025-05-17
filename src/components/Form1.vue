<template>
  <div>
    <Field v-for="item in list" :key="item.name" :item="item" />
    <h4>values: {{ values }}</h4>
    <h4>errors: {{ errors }}</h4>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'

import Field from './Field1.vue'
import type { FormValues } from '../types/common'

const list = [{ name: 'name' as const }, { name: 'email' as const }, { name: 'recommend' as const, nested: [{ name: 'hasRecommended' }, { name: 'recommendation' }, { name: 'requiredField' }] }]

const { values, errors, submitForm } = useForm<FormValues>({
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email must be valid').required('Email is required'),
    recommend: yup.object({
      hasRecommended: yup.boolean().required('Recommendation is required'),
      recommendation: yup.string().when('hasRecommended', {
        is: true,
        then: schema => schema.required('Recommendation is required'),
        otherwise: schema => schema.notRequired(),
      }),
      requiredField: yup.string().required('Required field is required'),
    }),
  }),
  initialValues: {
    name: '',
    email: '',
    recommend: {
      hasRecommended: false,
      recommendation: '',
      requiredField: '',
    },
  },
})
</script>

<style scoped></style>
