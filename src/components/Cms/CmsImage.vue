<script setup lang="ts">
import { ref } from 'vue'
import type { CmsBlockData } from '@/types/cms'
import { mdiImagePlus, mdiClose } from '@mdi/js'

// TODO 待調整
const model = defineModel<CmsBlockData>({ required: true })

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const update = (field: keyof CmsBlockData, value: unknown) => {
  model.value = { ...model.value, [field]: value }
}

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) processFile(file)
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) processFile(file)
}

const processFile = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    update('imagePath', e.target?.result as string)
  }
  reader.readAsDataURL(file)
}

const clearImage = () => {
  update('imagePath', '')
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <v-card class="pa-4" flat>
    <div
      v-if="!model.imagePath"
      class="upload-zone rounded-lg d-flex flex-column align-center justify-center pa-6 mb-4"
      :class="{ 'upload-zone--dragging': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="fileInput?.click()"
    >
      <v-icon :icon="mdiImagePlus" size="40" color="medium-emphasis" />
      <p class="text-body-2 text-medium-emphasis mt-2 mb-0">
        拖曳圖片到此，或 <span class="text-primary" style="cursor:pointer">點擊上傳</span>
      </p>
      <p class="text-caption text-disabled mt-1">支援 JPG、PNG、WebP</p>
    </div>
    <div v-else class="mb-4 position-relative">
      <v-img :src="model.imagePath" max-height="200" cover class="rounded-lg" />
      <v-btn
        :icon="mdiClose"
        size="x-small"
        color="error"
        class="position-absolute top-0 right-0 ma-2"
        @click="clearImage"
      />
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="d-none"
      @change="handleFileSelect"
    />
    <v-row>
      <v-col cols="12" md="6">
        <FormInput
          v-model="model.imageCaption"
          label="圖片說明"
        />
      </v-col>
      <v-col cols="12" md="6">
        <FormInput
          v-model="model.imageAlt"
          label="圖片替代文字"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.upload-zone {
  border: 2px dashed rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}
.upload-zone:hover {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.04);
}
.upload-zone--dragging {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
