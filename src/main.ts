import { createApp } from 'vue'
import App from './App.vue'
import registerPlugins from './plugins'

import 'primeicons/primeicons.css'
import './assets/style.css'

const app = registerPlugins(createApp(App))

app.mount('#app')
