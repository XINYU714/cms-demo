<script setup lang="ts">
import type { FormProps } from './formProps';
import { useFormLogic } from './useFormLogic';

const props = withDefaults(defineProps<FormProps>(), {
  isRequired: true,
  isDisabled: false,
  isReadOnly: false,
  ruleList: () => [],
})

const formValue = defineModel<string>()
const { formatRules } = useFormLogic(props)

</script>

<template>
  <v-textarea 
    v-model="formValue"
    :label="label"
    :disabled="isDisabled"
    :readonly="isReadOnly"
    :rules="formatRules"
    clearable auto-grow
    density="comfortable" hide-details="auto" color="primary" rows="3" variant="outlined"
  />
</template>