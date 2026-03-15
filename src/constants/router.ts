export interface RouteConfig {
  title: string;
  path: string;
  name: string;
  component: () => Promise<any>;
  isShowNavBar?: boolean;
}

export const routeConfigs: RouteConfig[] = [
  {
    title: '問卷展示',
    path: '/form',
    name: 'FormPage',
    component: () => import('@/pages/FormPage.vue'),
    isShowNavBar: true,
  },
  {
    title: '活動管理',
    path: '/activity',
    name: 'ActivityList',
    component: () => import('@/pages/ActivityMgmt/ActivityList.vue'),
  },
  {
    title: '活動新增',
    path: '/activity/add',
    name: 'ActivityAdd',
    component: () => import('@/pages/ActivityMgmt/ActivityEdit.vue'),
    isShowNavBar: false,
  },
  {
    title: '活動編輯',
    path: '/activity/edit/:id',
    name: 'ActivityEdit',
    component: () => import('@/pages/ActivityMgmt/ActivityEdit.vue'),
    isShowNavBar: false,
  },
];