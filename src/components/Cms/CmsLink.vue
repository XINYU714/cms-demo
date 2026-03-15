<script setup lang="ts">
import type { CmsBlockData } from '@/types/cms'

const model = defineModel<CmsBlockData>({ required: true })
</script>

<template>
  <v-card class="pa-4" flat>
    <FormInput
      v-model="model.url"
      label="連結網址"
    />
    <FormCheckbox
      v-model="model.openNewTab"
      label="另開新視窗"
    />
  </v-card>
</template>
