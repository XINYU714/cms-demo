<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/DataTable/DataTable.vue'
import type { DataTableHeader } from '@/components/DataTable/DataTable.vue'
import { activityApi, type Activity } from '@/api'
import { usePagination } from '@/composables/usePagination'

const router = useRouter()

const headers = ref<DataTableHeader[]>([
  { title: 'ID', key: 'id', sortable: true },
  { title: '活動名稱', key: 'name', sortable: true },
  { title: '開始時間', key: 'startTime', sortable: true },
  { title: '結束時間', key: 'endTime', sortable: true },
  { title: '狀態', key: 'isActive', sortable: false, align: 'center' },
  { title: '操作', key: 'actions', sortable: false, align: 'center', width: '140px' },
])

const {
  loading,
  items,
  totalItems,
  currentPage,
  pageSize,
  loadItems,
  handlePageChange,
  handlePageSizeChange,
  handleSortChange
} = usePagination<Activity>(activityApi.getList)

const handleHeadersChange = (newHeaders: DataTableHeader[]) => {
  headers.value = newHeaders
}

const handleDelete = async ({ id }: { id: number }) => {
  await activityApi.remove(id)
  loadItems()
}

const handleSwitch = async (id: number, val: number) => {
  await activityApi.update(id, { isActive: val })
  loadItems()
}


loadItems()
</script>

<template>
  <div class="py-10 px-5">
    <DataTable
      tableTitle="活動列表"
      :headers="headers"
      :itemList="items"
      :totalCount="totalItems"
      :isLoading="loading"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :isShowAddBtn="true"
      :isShowEditBtn="true"
      :isShowDeleteBtn="true"
      :isShowSortBtn="false"
      :isShowEditColumnBtn="false"
      :isShowFilterBtn="false"
      @update:currentPage="handlePageChange"
      @update:pageSize="handlePageSizeChange"
      @update:sortColumnList="handleSortChange"
      @update:headers="handleHeadersChange"
      @handleDelete="handleDelete"
      @handleEdit="(id) => router.push(`/activity/edit/${id}`)"
      @handleAdd="router.push('/activity/add')"
      @handleSwitch="handleSwitch"
    />
  </div>
</template>