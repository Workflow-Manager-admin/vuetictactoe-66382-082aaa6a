import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useScoreStore } from './stores/tictactoeScore'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

useScoreStore() // Initialize the score store on app start

app.mount('#app')
