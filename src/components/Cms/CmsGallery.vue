<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import type { CmsBlockData } from '@/types/cms'
import { iconDrag, iconTrash, iconAdd } from '@/constants/icons'

// TODO 待調整
const model = defineModel<CmsBlockData>({ required: true })

function update(field: keyof CmsBlockData, value: unknown) {
  model.value = { ...model.value, [field]: value }
}

const list = ref<{ imagePath: string; imageCaption: string }[]>(
  model.value.galleryList || []
)

const handleAdd = () => {
  list.value.push({ imagePath: '', imageCaption: '' })
  updateList()
}

const handleRemove = (i: number) => {
  list.value.splice(i, 1)
  updateList()
}

const updateList = () => {
  update('galleryList', list.value)
}
</script>

<template>
  <v-card class="pa-4" flat>
    <draggable
      v-model="list"
      :animation="200"
      handle=".gallery-drag"
      item-key="index"
      class="d-flex flex-column gap-3"
      @end="updateList"
    >
      <template #item="{ element, index }">
        <div class="d-flex align-center gap-2">
          <v-btn
            color="secondary"
            variant="text"
            min-width="32"
            width="32"
            height="32"
            class="gallery-drag cursor-move"
          >
            <v-icon :icon="iconDrag" size="24" />
          </v-btn>

          <v-text-field
            v-model="element.imagePath"
            label="圖片 URL / Base64"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="flex-1"
            @update:model-value="updateList"
          />

          <v-text-field
            v-model="element.imageCaption"
            label="圖片說明"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="flex-1"
            @update:model-value="updateList"
          />

          <v-btn
            @click="handleRemove(index)"
            color="error"
            variant="text"
            min-width="32"
            width="32"
            height="32"
          >
            <v-icon :icon="iconTrash" size="24" />
          </v-btn>
        </div>
      </template>
    </draggable>

    <v-btn
      @click="handleAdd"
      :prepend-icon="iconAdd"
      size="small"
      rounded="lg"
      color="secondary"
      class="mt-4"
    >
      新增圖片
    </v-btn>
  </v-card>
</template>
