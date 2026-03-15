<script setup lang="ts">
import type { CmsBlockData } from '@/types/cms'
import { computed } from 'vue'

const model = defineModel<CmsBlockData>({ required: true })

const titleType = computed(() => {
  return model.value.cmsType === 'title' 
    ? { label: '大標', inputLabel: '大標文字' } 
    : { label: '小標', inputLabel: '小標文字' }
})
</script>

<template>
  <v-card class="pa-4" flat>
    <FormInput
      v-model="model.content"
      :label="titleType.inputLabel"
    />
    <CmsAlign v-model="model.align" />
  </v-card>
</template>
