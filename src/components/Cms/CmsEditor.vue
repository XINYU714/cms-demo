<script setup lang="ts">
import draggable from 'vuedraggable'
import { createCmsBlock } from '@/types/cms'
import type { CmsBlockType, CmsBlockData } from '@/types/cms'
import { getCmsOption } from '@/constants/cmsConfig'
import { iconAdd, iconDrag, iconDelete } from '@/constants/icons'

interface BlockItem {
  id: string
  data: CmsBlockData
}

const modelValue = defineModel<BlockItem[]>({ default: () => [] })

const addCmsBlock = (type: CmsBlockType) => {
  modelValue.value.push({ id: crypto.randomUUID(), data: createCmsBlock(type) })
}

const removeBlock = (id: string) => {
  modelValue.value = modelValue.value.filter((item) => item.id !== id)
}


</script>

<template>
  <div>
    <v-card class="mb-8 pa-5" variant="outlined" color="secondary">
      <p class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center">點擊按鈕新增內容模組</p>
      <CmsButtonList @addCmsBlock="addCmsBlock" />
    </v-card>

    <v-card
      v-if="modelValue.length === 0"
      variant="tonal"
      color="secondary"
      class="text-center py-16 mb-8 d-flex flex-column align-center"
    >
      <v-icon :icon="iconAdd" size="48" class="mb-4 opacity-50" />
      <p class="text-body-1 font-weight-bold">尚未新增任何內容模組</p>
      <p class="text-body-2 mb-0">請從上方的選單點擊新增</p>
    </v-card>

    <draggable
      v-else
      v-model="modelValue"
      :animation="200"
      handle=".block-drag-handle"
      item-key="id"
      class="d-flex flex-column gap-6"
    >
      <template #item="{ element: item }">
        <v-card elevation="2" class="pa-0 overflow-hidden" rounded="lg">
          <template v-if="getCmsOption(item.data.cmsType)">
            <!-- Block Header -->
            <div class="bg-background px-4 py-2 d-flex align-center border-b">
              <v-btn variant="text" color="secondary" size="small" icon class="block-drag-handle cursor-move mr-2">
                <v-icon :icon="iconDrag" size="20" />
              </v-btn>
              <v-icon
                :icon="getCmsOption(item.data.cmsType)?.icon"
                :color="getCmsOption(item.data.cmsType)?.color"
                size="20" class="mr-2"
              />
              <span class="text-subtitle-2 font-weight-bold" :class="`text-${getCmsOption(item.data.cmsType)?.color}`">
                {{ getCmsOption(item.data.cmsType)?.title }}
              </span>
              <v-spacer />
              <v-btn icon @click="removeBlock(item.id)" variant="text" color="error" size="small">
                <v-icon :icon="iconDelete" size="20" />
              </v-btn>
            </div>
            <div class="pa-4 bg-surface">
              <component
                :is="getCmsOption(item.data.cmsType)?.component"
                v-model="item.data"
              />
            </div>
          </template>
        </v-card>
      </template>
    </draggable>
  </div>
</template>
