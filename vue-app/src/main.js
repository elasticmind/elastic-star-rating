import Vue from 'vue'
import App from './App.vue'

import { applyPolyfills, defineCustomElements } from 'components/loader';

Vue.config.productionTip = false

// Tell Vue to ignore all components defined in the test-components
// package. The regex assumes all components names are prefixed
// 'test'
Vue.config.ignoredElements = ['my-component'];

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});

new Vue({
  render: h => h(App),
}).$mount('#app')
