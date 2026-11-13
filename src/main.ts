import '@tabler/core/dist/css/tabler.min.css'
import './assets/main.css'
import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { TutorialPlugin } from 'v-tutorial'
import 'v-tutorial/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TutorialPlugin, {
  storageKey: 'odontotec-tutorial-completed',
  autoScroll: true,
  router,
})

app.mount('#app')
