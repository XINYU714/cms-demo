<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    submitText?: string
    cancelText?: string
    loading?: boolean
    disabled?: boolean
    isEditMode?: boolean
    isPreview?: boolean
    backUrl?: string
  }>(),
  {
    isEditMode: true,
    isPreview: false,
  }
)

const emit = defineEmits<{
  submit: []
  cancel: []
  preview: []
}>()

const router = useRouter()

const handleCancel = () => {
  if (props.backUrl) {
    router.push(props.backUrl)
  } else {
    emit('cancel')
  }
}

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <v-row class="justify-end align-center mt-5 mb-2 px-3 gap-4">
    <template v-if="isPreview">
      <v-btn
        variant="text"
        color="secondary"
        @click="emit('preview')"
      >
        預覽
      </v-btn>
      <span class="text-medium-emphasis">|</span>
    </template>

    <v-btn
      variant="outlined"
      color="secondary"
      :to="backUrl"
      @click="!backUrl && handleCancel()"
    >
      {{ cancelText || '返回列表' }}
    </v-btn>

    <v-btn
      variant="flat"
      color="primary"
      :loading="loading"
      :disabled="disabled"
      @click="handleSubmit"
    >
      {{ submitText || '儲存' }}
    </v-btn>
  </v-row>
</template>
