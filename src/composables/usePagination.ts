import { ref } from 'vue'

export interface PaginationParams {
  page?: number
  pageSize?: number
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  [key: string]: any
}

export function usePagination<T>(
  fetchFn: (params: PaginationParams) => Promise<{ data: T[]; total: number }>,
  defaultParams?: Partial<PaginationParams>
) {
  const loading = ref(false)
  const items = ref<T[]>([])
  const totalItems = ref(0)
  const currentPage = ref(defaultParams?.page || 1)
  const pageSize = ref(defaultParams?.pageSize || 10)
  const sortKey = ref(defaultParams?.sortKey || 'id')
  const sortOrder = ref<'asc' | 'desc'>(defaultParams?.sortOrder || 'asc')

  const loadItems = async (extraParams: Record<string, any> = {}) => {
    loading.value = true
    try {
      const result = await fetchFn({
        page: currentPage.value,
        pageSize: pageSize.value,
        sortKey: sortKey.value,
        sortOrder: sortOrder.value,
        ...extraParams
      })
      items.value = result.data as any
      totalItems.value = result.total
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = (page: number) => {
    currentPage.value = page
    loadItems()
  }

  const handlePageSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
    loadItems()
  }

  const handleSortChange = (sortList: any[]) => {
    if (sortList.length > 0) {
      const [[key, order]] = sortList
      sortKey.value = key
      sortOrder.value = order
    }
    loadItems()
  }

  return {
    loading,
    items,
    totalItems,
    currentPage,
    pageSize,
    sortKey,
    sortOrder,
    loadItems,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange
  }
}
