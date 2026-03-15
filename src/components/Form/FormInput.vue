<script setup lang="ts">
import type { FormProps } from './formProps';
import { useFormLogic } from './useFormLogic';

const props = withDefaults(defineProps<FormProps>(), {
  isRequired: true,
  isDisabled: false,
  isReadOnly: false,
  type: 'text',
  ruleList: () => [],
})

const formValue = defineModel<string | number>()
const { formatRules } = useFormLogic(props)

</script>

<template>
  <v-text-field
    v-model="formValue"
    :label="label"
    :type="type"
    :disabled="isDisabled"
    :readonly="isReadOnly"
    :rules="formatRules"
    clearable
    density="comfortable" variant="outlined" hide-details="auto" color="primary"
  />
</template>