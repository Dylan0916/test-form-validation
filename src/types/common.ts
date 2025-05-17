export interface FormValues {
  name: string
  email: string
  recommend: {
    hasRecommended: boolean
    recommendation: string
    requiredField: string
  }
}

export interface FormValues2 {
  name: string
  email: string
  hasRecommended: boolean
  recommendation: string
}
