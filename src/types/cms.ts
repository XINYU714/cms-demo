export type CmsAlign = 'left' | 'center' | 'right'
export type CmsBlockType = 'title' | 'smallTitle' | 'content' | 'image' | 'link' | 'quote' | 'youtube' | 'file' | 'itemList' | 'gallery' | 'article'

export interface CmsBlockData {
  cmsType: CmsBlockType
  /** 文字內容（CmsTitle / CmsContent / CmsSmallTitle / CmsQuote / CmsItemList(用逗號分隔或陣列) 使用） */
  content: string | string[]
  /** 對齊方式（可供 CmsTitle / CmsSmallTitle / CmsQuote 使用） */
  align: CmsAlign
  /** 連結 / Youtube 網址 */
  url: string
  /** 是否另開視窗 / 特定選項 */
  openNewTab: boolean
  /** 樣式選擇 (如：圖文元件、列表的樣式) */ // 圖文左圖右文、右圖左文  列表項目符號、編號
  styleType: string
  /** 圖片 Base64 或路徑 / Youtube url / File path */
  imagePath: string
  /** 圖片說明 / 檔案名稱 / 按鈕名稱 / 標題 */
  imageCaption: string
  /** 圖片 alt 文字 */
  imageAlt: string
  /** 多圖展示的圖片列表 */
  galleryList: { imagePath: string; imageCaption: string }[] // TODO
  /** 檔案相關 */
  fileData?: File | null
}

export function createCmsBlock(cmsType: CmsBlockType): CmsBlockData {
  return {
    cmsType,
    content: '',
    align: 'left',
    url: '',
    openNewTab: false,
    styleType: '1', // 圖文左圖右文、右圖左文  列表項目符號、編號
    imagePath: '',
    imageCaption: '',
    imageAlt: '',
    galleryList: [],
    fileData: null,
  }
}
