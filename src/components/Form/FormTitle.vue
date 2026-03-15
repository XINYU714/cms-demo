<script setup lang="ts">
defineProps<{
  title: string,
  subTitle?: string,
}>()
</script>

<template>
  <div class="mb-4">
    <h2 class="text-h4 font-weight-bold text-primary my-0" :class="{ 'mb-2': subTitle }">{{ title }}</h2>
    <span v-if="subTitle" class="text-body-small text-info">{{ subTitle }}</span>
  </div>
</template>