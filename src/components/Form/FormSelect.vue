<script setup lang="ts">
import type { FormProps } from './formProps';
import { useFormLogic } from './useFormLogic';

interface SelectOption {
  label: string;
  value: any;
  isDisabled?: boolean;
}

const props = withDefaults(
  defineProps<
    FormProps & {
      isMultiple?: boolean;
      itemList?: SelectOption[];
    }
  >(),
  {
    isRequired: true,
    isDisabled: false,
    isReadOnly: false,
    ruleList: () => [],
    isMultiple: false,
    itemList: () => [],
  }
);

const model = defineModel<any>();
const { formatRules } = useFormLogic(props);
</script>

<template>
  <v-select
    v-model="model"
    :items="itemList"
    :label="label"
    :multiple="isMultiple"
    :disabled="isDisabled"
    :readonly="isReadOnly"
    :rules="formatRules"
    clearable
    density="comfortable" hide-details="auto" color="primary" variant="outlined"
  />
</template>
