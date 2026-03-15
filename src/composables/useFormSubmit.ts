import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useMessage } from '@/composables/useMessage'

interface SubmitConfig<T> {
  createApi?: (data: T) => Promise<any>
  updateApi?: (id: number, data: Partial<T>) => Promise<any>
  getApi?: (id: number) => Promise<{ data: T[] } | T | any>
  backUrl: string
  defaultFormData: T
}

export function useFormSubmit<T extends Record<string, any>>(config: SubmitConfig<T>) {
  const route = useRoute()
  const router = useRouter()
  const toast = useMessage()

  const formRef = ref<any>(null)
  const loading = ref(false)

  const isEdit = computed(() => !!route.params.id)
  const id = computed(() => Number(route.params.id))

  const formData = ref<T>({ ...config.defaultFormData } as T)

  const loadData = async () => {
    if (!isEdit.value || !config.getApi) return
    try {
      loading.value = true
      const res = await config.getApi(id.value)

      if (res && typeof res === 'object' && 'data' in res && Array.isArray(res.data) && res.data.length > 0) {
        formData.value = { ...formData.value, ...res.data[0] }
      } else if (res && !('data' in res)) {
        formData.value = { ...formData.value, ...res }
      }
    } catch (error) {
      toast.error('載入資料失敗')
      console.error('Failed to load item:', error)
    } finally {
      loading.value = false
    }
  }

  const handleSubmit = async () => {
    if (formRef.value && typeof formRef.value.validate === 'function') {
      const { valid } = await formRef.value.validate()
      if (!valid) return
    }

    try {
      loading.value = true
      if (isEdit.value && config.updateApi) {
        await config.updateApi(id.value, formData.value)
      } else if (!isEdit.value && config.createApi) {
        await config.createApi(formData.value)
      }
      toast.success('儲存成功')
    } catch (error) {
      toast.error('儲存失敗，請檢查欄位或稍後再試')
    } finally {
      loading.value = false
    }
  }

  return {
    formRef,
    loading,
    isEdit,
    id,
    formData,
    loadData,
    handleSubmit
  }
}
