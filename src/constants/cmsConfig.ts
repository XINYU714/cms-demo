import { markRaw } from 'vue'
import type { Component } from 'vue'
import type { CmsBlockType } from '@/types/cms'

import CmsTitle from '@/components/Cms/CmsTitle.vue'
import CmsContent from '@/components/Cms/CmsContent.vue'
import CmsQuote from '@/components/Cms/CmsQuote.vue'
import CmsImage from '@/components/Cms/CmsImage.vue'
import CmsGallery from '@/components/Cms/CmsGallery.vue'
import CmsArticle from '@/components/Cms/CmsArticle.vue'
import CmsYoutube from '@/components/Cms/CmsYoutube.vue'
import CmsLink from '@/components/Cms/CmsLink.vue'
import CmsItemList from '@/components/Cms/CmsItemList.vue'
import CmsFile from '@/components/Cms/CmsFile.vue'

import {
  iconH2, iconH3, iconText, iconQuote,
  iconImage, iconGallery, iconArticle, iconYoutube,
  iconLink, iconBulletList, iconFile
} from '@/constants/icons'

export interface CmsBlockOption {
  type: CmsBlockType
  title: string
  icon: string
  color: string
  component: Component
}

export const cmsBlockOptionList: CmsBlockOption[] = [
  { type: 'title', title: '大標', icon: iconH2, color: 'primary', component: markRaw(CmsTitle) },
  { type: 'smallTitle', title: '小標', icon: iconH3, color: 'secondary', component: markRaw(CmsTitle) },
  { type: 'content', title: '內文', icon: iconText, color: 'primary', component: markRaw(CmsContent) },
  { type: 'quote', title: '引言', icon: iconQuote, color: 'secondary', component: markRaw(CmsQuote) },
  { type: 'image', title: '圖片上傳', icon: iconImage, color: 'info', component: markRaw(CmsImage) },
  // { type: 'gallery', title: '多圖展示', icon: iconGallery, color: 'info', component: markRaw(CmsGallery) },
  { type: 'article', title: '圖文元件', icon: iconArticle, color: 'info', component: markRaw(CmsArticle) },
  { type: 'youtube', title: 'Youtube', icon: iconYoutube, color: 'error', component: markRaw(CmsYoutube) },
  { type: 'link', title: '文字連結', icon: iconLink, color: 'success', component: markRaw(CmsLink) },
  { type: 'itemList', title: '項目清單', icon: iconBulletList, color: 'success', component: markRaw(CmsItemList) },
  { type: 'file', title: '附件上傳', icon: iconFile, color: 'secondary', component: markRaw(CmsFile) },
]

export function getCmsOption(type: CmsBlockType): CmsBlockOption | undefined {
  return cmsBlockOptionList.find((item) => item.type === type)
}
