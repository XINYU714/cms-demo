<script setup lang="ts">
import type { FormProps } from './formProps';
import { useFormLogic } from './useFormLogic';

interface RadioOption {
  title: string;
  value: any;
  isDisabled?: boolean;
}

const props = withDefaults(
  defineProps<
    FormProps & {
      itemList?: RadioOption[];
    }
  >(),
  {
    isRequired: true,
    isDisabled: false,
    isReadOnly: false,
    ruleList: () => [],
    itemList: () => [],
  }
);

const formValue = defineModel<any>();
const { formatRules } = useFormLogic(props);
</script>

<template>
  <div>
    <v-radio-group
      v-model="formValue"
      :disabled="isDisabled"
      :readonly="isReadOnly"
      :rules="formatRules"
      density="comfortable"
      hide-details="auto"
      color="primary"
      inline
    >
      <v-radio
        v-for="item in itemList"
        :key="item.value"
        :label="item.title"
        :value="item.value"
        :disabled="item.isDisabled"
      />
    </v-radio-group>
  </div>
</template> 