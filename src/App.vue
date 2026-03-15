<template>
  <v-app> 
    <v-navigation-drawer permanent>
      <v-list-item title="Demo" subtitle="vue3+ts"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link v-for="item in navItemList" :key="item.path" :to="item.path">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { routeConfigs } from '@/constants/router'

const navItemList = routeConfigs
  .filter(config => config.isShowNavBar !== false)
  .map(config => ({
    title: config.title,
    path: config.path,
  }))
</script>


