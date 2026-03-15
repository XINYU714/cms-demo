<script setup lang="ts">
import type { FormProps } from './formProps';
import { useFormLogic } from './useFormLogic';

interface CheckboxOption {
  title: string;
  value: any;
  isDisabled?: boolean;
}

const props = withDefaults(
  defineProps<
    FormProps & {
      isMultiple?: boolean;
      itemList?: CheckboxOption[];
    }
  >(),
  {
    isRequired: false,
    isDisabled: false,
    isReadOnly: false,
    ruleList: () => [],
    isMultiple: false,
    itemList: () => [],
  }
);

const formValue = defineModel<boolean | any[]>();
const { formatRules } = useFormLogic(props);

</script>

<template>
  <div v-if="isMultiple" class="flex flex-wrap items-center gap-2">
    <v-checkbox
      v-for="item in itemList"
      v-model="formValue"
      :key="item.title"
      :label="item.title"
      :value="item.value"
      :disabled="item.isDisabled"
      multiple
    />
  </div>

  <template v-else>
    <v-checkbox
      v-model="formValue"
      :label="label"
      :disabled="isDisabled"
      :readonly="isReadOnly"
      :rules="formatRules"
    />
  </template>
</template>