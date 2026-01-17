import type { App } from 'vue'
import router from '../router'
import pinia from './Pinia.plugin'
import PrimeVue, { primeVueConfig } from './PrimeVue.plugin'

export default function registerPlugins (app: App<Element>): App<Element> {
  return app
    .use(router)
    .use(pinia)
    .use(PrimeVue, {
      ...primeVueConfig
    })
}
