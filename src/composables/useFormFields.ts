import { useForm } from 'vee-validate'
import { formFields } from '../constants/formFields'
import type { FormField } from '../constants/formFields'
import { getValidationSchema } from '../utils/validationSchema'
import { computed } from 'vue'

interface FormValues {
  planType: string
  customPlanName: string
  startDate: string
  hasEndDate: boolean
  endDate: string
}

export function useFormFields() {
  const initialValues: FormValues = {
    planType: '',
    customPlanName: '123',
    startDate: '',
    hasEndDate: false,
    endDate: '',
  }

  // 傳 function 給 validationSchema，vee-validate 會自動帶入 values
  const { values, errors, handleSubmit, defineField, validate } = useForm<FormValues>({
    initialValues,
    validationSchema: getValidationSchema(),
  })

  // 產生欄位，直接用 defineField 回傳的 value 綁定 v-model
  const fields = (formFields as FormField[]).map(field => {
    const [value, meta] = defineField(field.name as keyof FormValues)
    return {
      ...field,
      value, // 直接回傳 value 給 v-model 綁定
      errorMessage: computed(() => meta.value.errorMessage),
      meta,
    }
  })

  const s = fields[0].value.value

  return { fields, values, errors, handleSubmit, validate }
}
