<script setup lang="ts">
import type { CmsBlockData } from '@/types/cms'

const model = defineModel<CmsBlockData>({ required: true })

const typeList = [
  { title: '左圖右文', value: '1' },
  { title: '右圖左文', value: '2' },
]
</script>

<template>
  <v-card class="pa-4" flat>
    <div class="flex flex-col gap-5">
      <FormSelect
        v-model="model.styleType"
        :items="typeList"
        label="排版樣式"
      />
      <FormUpload
        v-model="model.fileData"
        label="圖片"
        accept="image/*"
      />
      <FormInput
        v-model="model.imageCaption"
        label="區塊標題"
      />
      <FormTextarea
        v-model="model.content"
        label="區塊內文"
      />
    </div>
  </v-card>
</template>
