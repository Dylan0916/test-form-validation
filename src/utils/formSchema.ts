import * as yup from 'yup'

export function getFormSchema() {
  return yup.object({
    planType: yup.string().required('請選擇方案類型'),
    customPlanName: yup.string().when('planType', {
      is: 'custom',
      then: s => s.required('自訂方案名稱為必填'),
      otherwise: s => s.notRequired(),
    }),
    startDate: yup.date().required('請選擇服務開始時間'),
    hasEndDate: yup.boolean(),
    endDate: yup.date().when('hasEndDate', {
      is: true,
      then: s => s.required('請選擇服務結束時間'),
      otherwise: s => s.notRequired(),
    }),
    isPublic: yup.boolean(),
    accessCode: yup.string().when('isPublic', {
      is: false,
      then: s => s.required('存取代碼為必填'),
      otherwise: s => s.notRequired(),
    }),
    pricingModel: yup.string().required('請選擇價格模式'),
    tierPricing: yup.array().when('pricingModel', {
      is: 'tiered',
      then: s => s.required('分級價格設定為必填').min(1, '至少需一筆分級價格'),
      otherwise: s => s.notRequired(),
    }),
    currency: yup.string().required('請選擇幣別'),
    price: yup.number().typeError('請輸入售價').required('售價為必填').moreThan(0, '售價需大於 0'),
    cost: yup
      .number()
      .typeError('請輸入成本')
      .notRequired()
      .test('cost-lt-price', '成本需小於售價', function (value) {
        const { price } = this.parent
        if (value === undefined || value === null) return true
        return value < price
      }),
    commissionType: yup.string().required('請選擇抽成類型'),
    commissionRate: yup.number().when('commissionType', {
      is: 'percentage',
      then: s => s.typeError('請輸入抽成百分比').required('抽成百分比為必填').min(0, '最小為 0').max(100, '最大為 100'),
      otherwise: s => s.notRequired(),
    }),
    enableLimit: yup.boolean(),
    maxPeople: yup.number().when('enableLimit', {
      is: true,
      then: s => s.typeError('請輸入最大人數').required('最大人數為必填').moreThan(0, '最大人數需大於 0'),
      otherwise: s => s.notRequired(),
    }),
    enableTimeRange: yup.boolean(),
    availableTimes: yup.array().when('enableTimeRange', {
      is: true,
      then: s => s.required('可預約時段為必填').min(1, '至少需一個時段'),
      otherwise: s => s.notRequired(),
    }),
    requireIDVerification: yup.boolean(),
    idType: yup.string().when('requireIDVerification', {
      is: true,
      then: s => s.required('驗證身分方式為必填'),
      otherwise: s => s.notRequired(),
    }),
  })
}
