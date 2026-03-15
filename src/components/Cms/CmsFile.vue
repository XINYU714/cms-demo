<script setup lang="ts">
import type { CmsBlockData } from '@/types/cms'

const model = defineModel<CmsBlockData>({ required: true })
</script>

<template>
  <v-card class="pa-4" flat>
    <div class="flex flex-col gap-4">
      <FormInput
        v-model="model.content"
        label="檔案名稱"
      />
      <FormUpload
        v-model="model.fileData"
        label="上傳PDF檔案"
      />
    </div>
  </v-card>
</template>
