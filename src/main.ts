import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';


// PrimeVue styles
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.directive('ripple', Ripple)
app.use(router);
app.use(ToastService);

app.mount('#app')

