import { createApp } from 'vue'
import App from './App.vue'
import 'es6-promise/auto'
import installElementPlus from './plugins/element'
import installUtils from './plugins/util'
import installRouter from './router'

const app = createApp(App)
installElementPlus(app)
installUtils(app)
installRouter(app)
app.mount('#app')