<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import type { CmsBlockData } from '@/types/cms'
import { iconDrag, iconTrash, iconAdd } from '@/constants/icons'

const model = defineModel<CmsBlockData>({ required: true })

const typeList = [
  { title: '項目符號', value: '1' },
  { title: '編號', value: '2' },
]

const itemList = ref<string[]>(
  Array.isArray(model.value.content) 
    ? [...model.value.content] 
    : (model.value.content ? (model.value.content as string).split(',') : [''])
)

watch(itemList, (newList) => {
  model.value.content = newList
}, { deep: true })

const handleAddItem = () => itemList.value.push('')
const handleDeleteItem = (index: number) => itemList.value.splice(index, 1)
</script>

<template>
  <v-card class="pa-4" flat>
    <div class="flex flex-col gap-4">
      <FormSelect
        v-model="model.styleType"
        :items="typeList"
        label="列表樣式"
      />
      <FormInput
        v-model="model.imageCaption"
        label="清單標題"
      />
      <draggable
        v-model="itemList"
        :animation="200"
        handle=".item-list-drag"
        item-key="index"
        class="d-flex flex-column gap-2"
      >
        <template #item="{ index }">
          <div class="d-flex align-center gap-2 mb-2">
            <v-btn
              :disabled="itemList.length <= 1"
              color="secondary" variant="text" min-width="32" width="32" height="32"
              class="item-list-drag cursor-move"
            >
              <v-icon :icon="iconDrag" size="24" />
            </v-btn>

            <FormInput
              v-model="itemList[index]"
              label="內容"
            />

            <v-btn
              :disabled="itemList.length <= 1"
              @click="handleDeleteItem(index)"
              color="error" variant="text" min-width="32" width="32" height="32"
            >
              <v-icon :icon="iconTrash" size="24" />
            </v-btn>
          </div>
        </template>
      </draggable>

      <v-btn
        @click="handleAddItem"
        :prepend-icon="iconAdd"
        size="small" rounded="lg" color="secondary" class="mt-4"
      >
        新增項目
      </v-btn>
    </div>
  </v-card>
</template>
