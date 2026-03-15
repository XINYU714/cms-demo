<template>
<v-container class="flex flex-col gap-5 justify-center w-full px-5 mx-auto">
  <h1 class="text-2xl font-bold text-center mb-6">表單常見組件與驗證展示</h1>
  
  <v-form ref="formRef" @submit.prevent>
    <v-card variant="outlined" class="pa-5 mb-5 d-flex flex-column gap-5" color="secondary">
      <h2 class="text-h6 text-primary mb-2 font-weight-bold">基礎輸入與文字驗證</h2>
      <FormInput 
        label="標題 (必填，最多10字)" 
        v-model="inputValue" 
        :ruleList="[maxLengthRule(10)]"
      />
      
      <FormInput 
        label="電子信箱 (Email格式)" 
        v-model="emailValue" 
        :ruleList="[emailRule]"
      />
      
      <FormInput 
        label="個人網址(非必填)" 
        v-model="urlValue" 
        :ruleList="[urlRule]"
        :isRequired="false"
      />
      
      <FormInput 
        label="密碼 (長度8-20, 英數特殊符號)" 
        type="password"
        v-model="passwordValue" 
        :ruleList="[requireRule, ...passwordRuleList]"
      />

      <FormInput 
        label="確認密碼" 
        type="password"
        v-model="confirmPasswordValue" 
        :ruleList="[requireRule, confirmPasswordRule(passwordValue)]"
      />
      
      <FormTextarea 
        label="說明 (必填，最多50字)" 
        v-model="textareaValue" 
        :ruleList="[maxLengthRule(50)]"
      />
    </v-card>

    <v-card variant="outlined" class="pa-5 mb-5 d-flex flex-column gap-5" color="secondary">
      <h2 class="text-h6 text-primary mb-2 font-weight-bold">選擇器驗證</h2>
      <FormSelect 
        label="單選下拉 (必選)" 
        :itemList="selectItemList" 
        v-model="selectValue" 
      />
      
      <FormCheckbox 
        label="我同意服務條款 (必勾選)" 
        v-model="checkboxValue" 
        :ruleList="[(v: any) => v === true || '必須同意服務條款']"
      />
      
      <FormCheckbox
        label="興趣多選 (至少選一項)"
        :isMultiple="true"
        :itemList="selectItemList"
        v-model="multiCheckboxValue"
        :ruleList="[requireRule]"
      />
      
      <FormRadio 
        label="選項單選 (必選)" 
        :itemList="selectItemList" 
        v-model="radioValue" 
        :ruleList="[requireRule]"
      />
    </v-card>
    
    <div class="d-flex justify-center mt-6">
      <v-btn color="primary" @click="submit" size="large">送出表單驗證</v-btn>
    </div>
  </v-form>
</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  requireRule, 
  maxLengthRule, 
  emailRule, 
  urlRule, 
  passwordRuleList, 
  confirmPasswordRule 
} from '@/utils/rules';
import { useMessage } from '@/composables/useMessage';

const formRef = ref<any>(null);

const selectItemList = [
  { title: '選項 1', label: '選項 1', value: 1 },
  { title: '選項 2', label: '選項 2', value: 2 },
  { title: '選項 3', label: '選項 3', value: 3 },
];
const toast = useMessage();

const inputValue = ref('');
const emailValue = ref('');
const urlValue = ref('');
const passwordValue = ref('');
const confirmPasswordValue = ref('');
const textareaValue = ref('');
const selectValue = ref(null);
const checkboxValue = ref(false);
const multiCheckboxValue = ref([]);
const radioValue = ref(null);

const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    toast.success('表單驗證成功');
    return
  } 
  toast.error('表單驗證失敗');
};
</script>
  