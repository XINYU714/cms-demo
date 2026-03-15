<script setup lang="ts">
import type { CmsBlockType } from '@/types/cms'
import { cmsBlockOptionList } from '@/constants/cmsConfig'

const emits = defineEmits<{
  addCmsBlock: [type: CmsBlockType]
}>()
</script>

<template>
  <div class="d-flex flex-wrap gap-2">
    <v-chip
      v-for="item in cmsBlockOptionList"
      :key="item.type"
      :prepend-icon="item.icon"
      @click="emits('addCmsBlock', item.type as CmsBlockType)"
      color="secondary" class="cursor-pointer"
    >
      {{ item.title }}
    </v-chip>
  </div>
</template>
