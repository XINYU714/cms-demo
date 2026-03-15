<script setup lang="ts">
import type { CmsBlockData } from '@/types/cms'
import { youtubeRule } from '@/utils/rules'

const model = defineModel<CmsBlockData>({ required: true })
</script>

<template>
  <v-card class="pa-4" flat>
    <FormInput
      v-model="model.url"
      label="Youtube URL"
      :rules="[youtubeRule]"
    />
  </v-card>
</template>
