export interface FormFieldOption {
  label: string
  value: string | boolean
}

export interface FormField {
  name: 'planType' | 'customPlanName' | 'startDate' | 'hasEndDate' | 'endDate'
  label: string
  type: 'select' | 'text' | 'date' | 'checkbox'
  options?: FormFieldOption[]
}

export const formFields: FormField[] = [
  {
    name: 'planType',
    label: '方案類型',
    type: 'select',
    options: [
      { label: '標準', value: 'standard' },
      { label: '自訂', value: 'custom' },
    ],
  },
  {
    name: 'customPlanName',
    label: '自訂方案名稱',
    type: 'text',
  },
  {
    name: 'startDate',
    label: '服務開始時間',
    type: 'date',
  },
  {
    name: 'hasEndDate',
    label: '是否有結束時間',
    type: 'checkbox',
  },
  {
    name: 'endDate',
    label: '服務結束時間',
    type: 'date',
  },
]
