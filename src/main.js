import { createApp } from 'vue'
import App from './App.vue'
import 'es6-promise/auto'
import installStore from './store/index'
import installElementPlus from './plugins/element'
import installUtils from './plugins/util'
import installRouter from './router'
import installAxios from './apis/http'
import './element-variables.scss'


const app = createApp(App)
installElementPlus(app)
installStore(app)
installUtils(app)
installRouter(app)
installAxios(app)
app.mount('#app')