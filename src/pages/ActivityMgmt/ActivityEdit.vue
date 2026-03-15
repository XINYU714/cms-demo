<script setup lang="ts">
import { shallowRef } from 'vue'
import { mdiCodeJson, mdiEyeOff } from '@mdi/js'
import { activityApi, type Activity } from '@/api'
import { useFormSubmit } from '@/composables/useFormSubmit'

const activeOptionList = [
  { title: '啟用', value: 1 },
  { title: '停用', value: 0 },
]

const {
  formRef,
  loading,
  isEdit,
  formData,
  loadData,
  handleSubmit
} = useFormSubmit<Omit<Activity, 'id'>>({
  createApi: activityApi.create,
  updateApi: activityApi.update,
  getApi: (id) => activityApi.getList({ page: 1, pageSize: 1, id } as any),
  backUrl: '/activity',
  defaultFormData: {
    name: '',
    startTime: '',
    endTime: '',
    isActive: 1,
    cmsList: [],
  }
})

const isShowJson = shallowRef(false)
const outputData = () => formData.value.cmsList.map((item: any) => item.data)

loadData()
</script>

<template>
  <v-container max-width="960" class="py-10">
    <div class="d-flex align-center justify-space-between ">
      <FormTitle 
        :title="isEdit ? '編輯活動' : '新增活動'" 
        subTitle="請填寫活動基本資訊與設定頁面段落" 
      />
      <v-btn
        :prepend-icon="isShowJson ? mdiEyeOff : mdiCodeJson"
        color="secondary" variant="tonal"
        @click="isShowJson = !isShowJson"
      >
        {{ isShowJson ? '隱藏 JSON' : '預覽 JSON' }}
      </v-btn>
    </div>

    <v-expand-transition>
      <v-card v-if="isShowJson" variant="tonal" color="secondary" class="mb-5 pa-4">
        <pre class="text-caption overflow-auto whitespace-pre-wrap">{{ JSON.stringify(outputData(), null, 2) }}</pre>
      </v-card>
    </v-expand-transition>

    <v-form ref="formRef" @submit.prevent>
      <v-card class="mb-8 pa-5" variant="outlined" color="secondary">
        <h3 class="text-h6 font-weight-bold mb-4 text-primary">基本資訊</h3>
        <div class="d-flex flex-column gap-5">
          <FormInput
            label="活動名稱"
            v-model="formData.name"
            :ruleList="[(v) => !!v || '請輸入活動名稱']"
          />

          <v-row>
            <v-col cols="12" md="6">
              <FormInput
                label="開始時間"
                type="datetime-local"
                v-model="formData.startTime"
                :ruleList="[(v) => !!v || '請輸入開始時間']"
              />
            </v-col>
            <v-col cols="12" md="6">
              <FormInput
                label="結束時間"
                type="datetime-local"
                v-model="formData.endTime"
                :ruleList="[(v) => !!v || '請輸入結束時間']"
              />
            </v-col>
          </v-row>

          <FormRadio
            label="活動狀態"
            :itemList="activeOptionList"
            v-model="formData.isActive"
          />
        </div>
      </v-card>

      <v-card class="mb-8 pa-5" variant="outlined" color="secondary">
        <h3 class="text-h6 font-weight-bold mb-4 text-primary">頁面內容編輯</h3>
        <CmsEditor v-model="formData.cmsList" />
      </v-card>

      <EditFooter
        :loading="loading"
        :isEditMode="isEdit"
        backUrl="/activity"
        @submit="handleSubmit"
      />
    </v-form>
  </v-container>
</template>