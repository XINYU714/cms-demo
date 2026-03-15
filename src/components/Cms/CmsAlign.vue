<script setup lang="ts">
import { mdiFormatAlignLeft, mdiFormatAlignCenter, mdiFormatAlignRight } from '@mdi/js'
import type { CmsAlign } from '@/types/cms'

const model = defineModel<CmsAlign>({ required: true })

const alignOptionList: { title: string; value: CmsAlign; icon: string }[] = [
  { title: '靠左', value: 'left', icon: mdiFormatAlignLeft },
  { title: '置中', value: 'center', icon: mdiFormatAlignCenter },
  { title: '靠右', value: 'right', icon: mdiFormatAlignRight },
]
</script>

<template>
  <div class="mt-4">
    <div class="text-title-medium text-medium-emphasis mb-2">對齊方式</div>
    <v-btn-toggle
      v-model="model"
      color="primary"
      variant="outlined"
      mandatory divided
    >
      <v-btn
        v-for="item in alignOptionList"
        :key="item.value"
        :value="item.value"
        :prepend-icon="item.icon"
        size="small"
      >
        {{ item.title }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>
