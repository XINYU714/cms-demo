import { computed } from 'vue'
import type { FormProps, ValidationRule } from './formProps'

export const useFormLogic = (props: FormProps) => {
  const formatRules = computed(() => {
    const list: ValidationRule[] = props.ruleList ? [...props.ruleList] : []
    if (props.isRequired) {
      list.unshift((value: any) => {
        if (value === 0) return true
        return (!!value && String(value).trim() !== '') || `${props.label || '此欄位'}為必填`
      })
    }
    return list
  })

  return {
    formatRules
  }
}
