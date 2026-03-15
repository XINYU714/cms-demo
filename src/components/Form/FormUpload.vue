<script setup lang="ts">
import { ref, computed } from 'vue'
import { mdiPaperclip, mdiClose } from '@mdi/js'
import type { FormProps } from './formProps';
import { useFormLogic } from './useFormLogic';

const props = withDefaults(
  defineProps<
    FormProps & {
      accept?: string;
      isMultiple?: boolean;
      prependIcon?: string;
      hint?: string;
    }
  >(),
  {
    isRequired: true,
    isDisabled: false,
    isReadOnly: false,
    ruleList: () => [],
    accept: '*',
    isMultiple: false,
    hint: '',
    prependIcon: mdiPaperclip,
  }
);

const model = defineModel<any>(); // File | File[] | null
const { formatRules } = useFormLogic(props);

const fileInput = ref<HTMLInputElement | null>(null);

const displayText = computed(() => {
  if (!model.value) return '';
  if (Array.isArray(model.value)) {
    return model.value.map(f => f.name).join(', ');
  }
  return model.value.name || '';
});

function handleFileSelect(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files || files.length === 0) return;

  if (props.isMultiple) {
    model.value = Array.from(files);
  } else {
    model.value = files[0];
  }
}

function clear() {
  model.value = props.isMultiple ? [] : null;
  if (fileInput.value) fileInput.value.value = '';
}

function triggerUpload() {
  if (!props.isDisabled && !props.isReadOnly) {
    fileInput.value?.click();
  }
}
</script>

<template>
  <div class="form-upload-container">
    <v-text-field
      :label="label"
      :model-value="displayText"
      :rules="formatRules"
      :prepend-icon="prependIcon"
      :disabled="isDisabled"
      :readonly="true"
      :hint="hint"
      persistent-hint
      density="comfortable"
      variant="outlined"
      hide-details="auto"
      color="primary"
      :append-inner-icon="mdiPaperclip"
      class="cursor-pointer"
      @click="triggerUpload"
      @click:append-inner="triggerUpload"
      @click:clear="clear"
    >
      <template v-if="model" #append-inner>
        <v-btn
          icon
          variant="text"
          size="small"
          density="comfortable"
          @click.stop="clear"
        >
          <v-icon :icon="mdiClose" size="20" />
        </v-btn>
      </template>
    </v-text-field>

    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="isMultiple"
      class="d-none"
      @change="handleFileSelect"
    />
  </div>
</template>

<style scoped>
.cursor-pointer :deep(input) {
  cursor: pointer !important;
}
</style>
