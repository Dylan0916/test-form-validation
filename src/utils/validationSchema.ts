import * as yup from 'yup'

export const getValidationSchema = () => {
  return yup.object({
    planType: yup.string().required('必填'),
    customPlanName: yup.string().when('planType', {
      is: 'custom',
      then: schema => schema.required('自訂方案名稱必填'),
      otherwise: schema => schema.notRequired(),
    }),
    startDate: yup.string().required('必填'), // 改為 string 並 required，避免 date 允許空字串
    hasEndDate: yup.boolean(),
    endDate: yup.date().when('hasEndDate', {
      is: true,
      then: schema => schema.required('結束時間必填'),
      otherwise: schema => schema.notRequired(),
    }),
  })
}
