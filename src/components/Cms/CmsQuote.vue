<script setup lang="ts">
import type { CmsBlockData } from '@/types/cms'

const model = defineModel<CmsBlockData>({ required: true })
</script>

<template>
  <v-card class="pa-4" flat>
    <FormTextarea
      v-model="model.content"
      label="引言"
    />
    <CmsAlign v-model="model.align" />
  </v-card>
</template>
