import { getFormSchema } from '../utils/formSchema'
import { useForm } from 'vee-validate'

export function useFormSchema() {
  const formSchema = getFormSchema()
  const { handleSubmit, errors, values, setFieldValue, validate, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
      planType: '',
      customPlanName: '',
      startDate: null,
      hasEndDate: false,
      endDate: null,
      isPublic: true,
      accessCode: '',
      pricingModel: '',
      tierPricing: [],
      currency: '',
      price: null,
      cost: null,
      commissionType: '',
      commissionRate: null,
      enableLimit: false,
      maxPeople: null,
      enableTimeRange: false,
      availableTimes: [],
      requireIDVerification: false,
      idType: '',
    },
    validateOnMount: false,
  })
  return { handleSubmit, errors, values, setFieldValue, validate, resetForm }
}
