import { createWebHistory, createRouter } from 'vue-router'
import { routeConfigs } from '@/constants/router'

const routes = routeConfigs.map(config => ({
  path: config.path,
  name: config.name,
  component: config.component,
}))

export const router = createRouter({
  history: createWebHistory(),
  routes,
})