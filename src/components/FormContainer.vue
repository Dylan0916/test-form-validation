<template>
  <form @submit.prevent="onSubmit">
    <FormField name="planType" label="方案類型" type="select" :options="PLAN_TYPE_OPTIONS" />
    <FormField v-if="values.planType === 'custom'" name="customPlanName" label="自訂方案名稱" />
    <FormField name="startDate" label="服務開始時間" type="date" />
    <FormField name="hasEndDate" label="是否有結束時間" type="checkbox" />
    <FormField v-if="values.hasEndDate" name="endDate" label="服務結束時間" type="date" />
    <FormField name="isPublic" label="是否公開" type="checkbox" />
    <FormField v-if="!values.isPublic" name="accessCode" label="存取代碼" />
    <FormField name="pricingModel" label="價格模式" type="select" :options="PRICING_MODEL_OPTIONS" />
    <FormField v-if="values.pricingModel === 'tiered'" name="tierPricing" label="分級價格設定" />
    <FormField name="currency" label="幣別" type="select" :options="CURRENCY_OPTIONS" />
    <FormField name="price" label="售價" type="number" />
    <FormField name="cost" label="成本" type="number" />
    <FormField name="commissionType" label="抽成類型" type="select" :options="COMMISSION_TYPE_OPTIONS" />
    <FormField v-if="values.commissionType === 'percentage'" name="commissionRate" label="抽成百分比" type="number" />
    <FormField name="enableLimit" label="啟用人數上限" type="checkbox" />
    <FormField v-if="values.enableLimit" name="maxPeople" label="最大人數限制" type="number" />
    <FormField name="enableTimeRange" label="限制預約時段" type="checkbox" />
    <FormField v-if="values.enableTimeRange" name="availableTimes" label="可預約時段列表" />
    <FormField name="requireIDVerification" label="需身分驗證" type="checkbox" />
    <FormField v-if="values.requireIDVerification" name="idType" label="驗證身分方式" type="select" :options="ID_TYPE_OPTIONS" />
    <button type="submit">送出</button>
    <div v-if="errors">{{ errors }}</div>
    <div v-if="success" class="success-message">success</div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormSchema } from '../composables/useFormSchema'
import FormField from './FormField.vue'
import { PLAN_TYPE_OPTIONS, PRICING_MODEL_OPTIONS, COMMISSION_TYPE_OPTIONS, CURRENCY_OPTIONS, ID_TYPE_OPTIONS } from '../constants/formOptions'

const { handleSubmit, values, errors } = useFormSchema()
const success = ref(false)

const onSubmit = handleSubmit(values => {
  console.log('== onSubmit ==', values)
  success.value = true
})
</script>

<style scoped>
.success-message {
  color: #43a047;
  font-size: 1.1em;
  margin-top: 1em;
}
</style>
