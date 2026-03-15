import { createApp } from 'vue'
import { router } from '@/router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { messagePlugin } from '@/composables/useMessage'

import '@/style.css'
import App from '@/App.vue'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#F3F4F4',
          surface: '#FFFFFF',
          primary: '#393E46',
          secondary: '#537D96',
          error: '#EC8F8D',
          info: '#537D96',
          success: '#44A194',
          warning: '#F5B041',
        },
      },
    },
  },
})

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(messagePlugin)

app.mount('#app')

