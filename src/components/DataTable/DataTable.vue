<script setup lang="ts" generic="T extends { id: string | number, sort?: number, isActive?: number }">
import { ref, computed, shallowRef } from 'vue'
import {
  iconEdit, iconSortList, iconFilter, iconMultiSelect,
  iconTrash, iconNoData, iconAlert,
  iconEditOutline, iconClose, iconAdd,
} from '@/constants/icons'

export interface DataTableHeader {
  title: string
  key: string
  sortable?: boolean
  isShowColumn?: boolean
  customColumn?: boolean
  align?: 'start' | 'center' | 'end'
  width?: string | number
}

const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const headers = defineModel<DataTableHeader[]>('headers', { default: () => [] })

const props = withDefaults(
  defineProps<{
    tableTitle?: string
    itemList?: T[]
    totalCount?: number
    isLoading?: boolean
    defaultOrderBy?: string
    isShowSortBtn?: boolean
    isShowAddBtn?: boolean
    isShowEditBtn?: boolean
    isShowDeleteBtn?: boolean
    isShowEditColumnBtn?: boolean
    isShowFilterBtn?: boolean
    isShowMultipleBtn?: boolean
    search?: Record<string, any>
    groupBy?: any[]
  }>(),
  {
    tableTitle: '',
    itemList: () => [],
    totalCount: 0,
    isLoading: false,
    defaultOrderBy: 'lastModifiedOn',
    isShowSortBtn: false,
    isShowAddBtn: true,
    isShowEditBtn: true,
    isShowDeleteBtn: true,
    isShowEditColumnBtn: true,
    isShowFilterBtn: true,
    isShowMultipleBtn: false,
    search: () => ({}),
    groupBy: () => [],
  }
)

const emits = defineEmits<{
  dataList: [value: T[]],
  sortColumnList: [value: any[]],
  isVisibleFilterModal: [value: boolean],
  handleEdit: [id: T['id'], item: T],
  handleDelete: [payload: { id: T['id'] }],
  handleAdd: [],
  handleSort: [payload: { sort: Record<string | number, number>[] }],
  handleDeleteSelected: [items: T[]],
  handleSwitch: [id: T['id'], val: number],
}>()

const sortBy = ref<any[]>([])
const selected = shallowRef<T[]>([])
const deleteId = ref<T['id'] | null>(null)
const isVisibleDeleteModal = ref(false)
const isVisibleFilterHeadersModal = ref(false)
const isShowSelect = ref(false)
const isShowSortMode = ref(false)

const sortOrderList = shallowRef<Record<T['id'], number>[]>([])
const oriDataList = shallowRef<T[]>([])

const visibleHeaders = computed(() => {
  return headers.value.filter((item) => item.isShowColumn !== false)
})

// 篩選條件的數量標示
const filterBadgeCount = computed(() => {
  return Object.entries(props.search).filter(([key, value]) => {
    return value !== '' && value !== null && value !== undefined && key !== 'keyword'
  }).length
})

const updateItemsPerPage = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleSortColumn = (val: any) => {
  if (val && val.length > 0) {
    emits('sortColumnList', [[val[0].key, val[0].order]])
  } else {
    emits('sortColumnList', [])
  }
}

const toggleFilterHeader = (key: string) => {
  const newHeaders = [...headers.value]
  const target = newHeaders.find((h) => h.key === key)
  if (target) {
    target.isShowColumn = !target.isShowColumn
  }
  headers.value = newHeaders
}

const resetFilterHeaders = () => {
  headers.value = headers.value.map(item => ({
    ...item,
    isShowColumn: 'isShowColumn' in item ? false : item.isShowColumn
  }))
  isVisibleFilterHeadersModal.value = false
}

const handleShowDeleteModal = (id: T['id']) => {
  deleteId.value = id
  isVisibleDeleteModal.value = true
}

const confirmDelete = () => {
  if (deleteId.value !== null) {
    emits('handleDelete', { id: deleteId.value })
  }
  isVisibleDeleteModal.value = false
}

// 拖曳或排序修改相關
const enterSortMode = () => {
  isShowSortMode.value = true
  oriDataList.value = [...props.itemList]
}

const handleItemSortChange = (id: T['id'], val: string | number) => {
  const numValue = Number(val)
  const list = props.itemList.map((item) => ({
    ...item,
    sort: item.id === id ? numValue : item.sort
  }))
  
  // 更新排序列表
  sortOrderList.value = [
    ...sortOrderList.value.filter((item) => !(id in item)),
    { [id]: numValue } as Record<T['id'], number>
  ]
  
  emits('dataList', list)
}

const handleSubmitSort = () => {
  isShowSortMode.value = false
  emits('handleSort', { sort: sortOrderList.value })
  sortOrderList.value = []
}

const handleCancelSort = () => {
  isShowSortMode.value = false
  emits('dataList', oriDataList.value)
  sortOrderList.value = []
}

// 批次刪除
const handleDeleteSelected = () => {
  isShowSelect.value = false
  emits('handleDeleteSelected', selected.value)
  selected.value = []
}
</script>

<template>
  <v-card class="pa-4 rounded-xl" elevation="0">
    <v-data-table-server
      v-model="selected"
      v-model:sort-by="sortBy"
      :group-by="groupBy"
      :page="currentPage"
      :items="itemList"
      :headers="visibleHeaders"
      :loading="isLoading"
      :show-select="isShowSelect"
      :items-per-page="pageSize"
      :items-length="totalCount"
      @update:page="handlePageChange"
      @update:items-per-page="updateItemsPerPage"
      @update:sort-by="handleSortColumn"
      items-per-page-text="每頁顯示"
      class="rounded-lg"
      density="comfortable"
      hover
    >
      <!-- Top Slot: 功能操作列 -->
      <template #top>
        <FormTitle :title="tableTitle" />
        <div class="d-flex align-center justify-space-between flex-wrap ga-4 pb-4">
          <!-- 分頁與每頁筆數操作 -->
          <div class="d-flex align-center ga-4">
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(totalCount / pageSize)"
              :total-visible="5"
              density="comfortable"
              active-color="primary"
            />
            <div style="width: 140px;">
              <v-select
                v-model="pageSize"
                :items="[5, 10, 20, 50]"
                density="compact"
                variant="outlined"
                hide-details
                label="每頁顯示"
                @update:model-value="currentPage = 1"
              />
            </div>
            <span class="text-caption text-medium-emphasis">共 {{ totalCount }} 筆</span>
          </div>

          <!-- 工具按鈕 -->
          <div v-if="!isShowSortMode && !isShowSelect" class="d-flex align-center ga-2">
            <slot name="table-header-tool" />

            <!-- 欄位編輯 -->
            <v-btn
              v-if="isShowEditColumnBtn"
              @click="isVisibleFilterHeadersModal = true"
              variant="tonal"
              color="secondary"
              size="small"
              :prepend-icon="iconEdit"
            >
              欄位編輯
            </v-btn>

            <!-- 自訂排序 -->
            <v-btn
              v-if="isShowSortBtn"
              @click="enterSortMode"
              variant="tonal"
              color="secondary"
              size="small"
              :prepend-icon="iconSortList"
            >
              自訂排序
            </v-btn>

            <!-- 篩選 -->
            <v-badge
              v-if="isShowFilterBtn"
              :content="filterBadgeCount"
              :model-value="filterBadgeCount > 0"
              color="error"
            >
              <v-btn
                @click="emits('isVisibleFilterModal', true)"
                variant="tonal"
                color="secondary"
                size="small"
                :prepend-icon="iconFilter"
              >
                篩選
              </v-btn>
            </v-badge>

            <!-- 多選 -->
            <v-btn
              v-if="isShowMultipleBtn"
              @click="isShowSelect = !isShowSelect"
              variant="tonal"
              color="secondary"
              size="small"
              :prepend-icon="iconMultiSelect"
            >
              多選
            </v-btn>
          </div>

          <!-- 自訂排序中的按鈕 -->
          <div v-if="isShowSortMode" class="d-flex align-center ga-3">
            <v-btn variant="outlined" color="medium-emphasis" @click="handleCancelSort">取消</v-btn>
            <v-btn variant="elevated" color="primary" @click="handleSubmitSort">確認排序</v-btn>
          </div>

          <!-- 多選中的按鈕 -->
          <div v-if="isShowSelect" class="d-flex align-center ga-3">
            <v-btn variant="outlined" color="medium-emphasis" @click="isShowSelect = false">取消</v-btn>
            <v-btn
              variant="elevated"
              color="error"
              :disabled="selected.length === 0"
              @click="handleDeleteSelected"
            >
              批次刪除 <span v-if="selected.length > 0">({{ selected.length }})</span>
            </v-btn>
          </div>
        </div>
        <slot name="table-header-intro" />
      </template>

      <!-- 無資料提示 -->
      <template #no-data>
        <div class="pa-10 text-center text-medium-emphasis">
          <v-icon :icon="iconNoData" size="48" class="mb-4 opacity-30" />
          <h3 class="text-h6">目前無相關資料</h3>
        </div>
      </template>

      <!-- 自定義欄位插槽 -->
      <template v-for="header in headers.filter(h => h.customColumn)" #[`item.${header.key}`]="{ item }">
        <slot :name="`table-row-${header.key}`" :item="item" />
      </template>

      <!-- 特殊內建欄位: index, id, sort, isActive, actions -->
      <template #item.index="{ index }">
        <span class="text-medium-emphasis">{{ (currentPage - 1) * pageSize + index + 1 }}</span>
      </template>

      <template #item.id="{ item }">
        <span class="text-secondary font-weight-bold">SN{{ item.id }}</span>
      </template>

      <template #item.sort="{ item }">
        <v-text-field
          v-if="isShowSortMode"
          :model-value="item.sort"
          @update:model-value="(val) => handleItemSortChange(item.id, val)"
          type="number" density="compact" variant="outlined"
          class="data-table-sort-input" hide-details
          style="max-width: 80px;"
        />
        <span v-else>{{ item.sort }}</span>
      </template>

      <template #item.isActive="{ item }">
        <div class="d-flex justify-center">
          <v-switch
            :model-value="!!item.isActive"
            @update:model-value="() => emits('handleSwitch', item.id, +!item.isActive)"
            color="secondary" density="compact" hide-details
          />
        </div>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex align-center ga-1">
          <v-btn
            v-if="isShowEditBtn"
            @click="emits('handleEdit', item.id, item)"
            variant="text" color="primary" size="small" class="px-2"
          >
            編輯
            <v-icon :icon="iconEditOutline" size="18" class="ml-1" />
          </v-btn>

          <v-btn
            v-if="isShowDeleteBtn"
            @click="handleShowDeleteModal(item.id)"
            variant="text" color="error" size="small" class="px-2"
          >
            刪除
            <v-icon :icon="iconTrash" size="18" class="ml-1" />
          </v-btn>

          <slot name="table-row-actions" :id="item.id" :item="item" />
        </div>
      </template>
    </v-data-table-server>
  </v-card>

  <!-- 刪除確認 Modal -->
  <v-dialog v-model="isVisibleDeleteModal" max-width="400">
    <v-card rounded="xl" class="pa-4 text-center">
      <v-icon :icon="iconAlert" size="64" color="error" class="mx-auto mt-4 mb-2" />
      <v-card-title class="text-h5 font-weight-bold">確定要刪除此筆資料？</v-card-title>
      <v-card-text class="text-medium-emphasis">刪除後將無法恢復，請確認操作。</v-card-text>
      <v-card-actions class="justify-center ga-4 mt-2 mb-4">
        <v-btn variant="outlined" color="medium-emphasis" @click="isVisibleDeleteModal = false" class="px-6 rounded-lg">取消</v-btn>
        <v-btn variant="elevated" color="error" @click="confirmDelete" class="px-6 rounded-lg">確定刪除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 欄位編輯 Modal -->
  <v-dialog v-model="isVisibleFilterHeadersModal" max-width="400">
    <v-card rounded="xl" class="pa-2">
      <v-card-title class="d-flex align-center justify-space-between pb-0">
        <div>
          <div class="text-h6 font-weight-bold">欄位編輯</div>
          <div class="text-caption text-medium-emphasis">選擇列表上所要顯示的資料欄位</div>
        </div>
        <v-btn :icon="iconClose" variant="text" size="small" @click="isVisibleFilterHeadersModal = false" />
      </v-card-title>
      
      <v-card-text class="pt-4 pb-2">
        <v-list class="bg-surface rounded-lg border text-start">
          <v-list-item
            v-for="item in headers.filter(item => 'isShowColumn' in item)"
            :key="item.key"
            @click="toggleFilterHeader(item.key)"
            class="border-b"
          >
            <template #prepend>
              <v-checkbox-btn
                :model-value="item.isShowColumn"
                color="primary"
                class="mr-2"
                readonly
              />
            </template>
            <v-list-item-title class="text-body-1">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="px-6 pb-6 pt-0">
        <v-btn @click="resetFilterHeaders" variant="outlined" color="error" class="rounded-lg" block>
          重置為預設
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 右下角浮動新增按鈕 -->
  <v-btn
    v-if="isShowAddBtn"
    @click="emits('handleAdd')"
    :icon="iconAdd"
    color="secondary"
    size="large"
    elevation="4"
    class="position-fixed"
    style="bottom: 32px; right: 32px; z-index: 100;"
  />
</template>
