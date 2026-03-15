import { inject, type InjectionKey, type Plugin } from 'vue'
import Message from 'vue-m-message'
import 'vue-m-message/dist/style.css'

export interface MessageMethods {
  success: (text: string, options?: any) => void
  error: (text: string, options?: any) => void
}

export const messageKey: InjectionKey<MessageMethods> = Symbol('message')

export const messagePlugin: Plugin = {
  install(app) {
    const messageCtx: MessageMethods = {
      success: (text, options) => Message.success(text, options),
      error: (text, options) => Message.error(text, options),
    }
    app.provide(messageKey, messageCtx)
  }
}

export function useMessage(): MessageMethods {
  const msg = inject(messageKey)
  if (!msg) {
    throw new Error('useMessage 必須在組件內使用，且確定 messagePlugin 已在 main.ts 註冊。')
  }
  return msg
}
