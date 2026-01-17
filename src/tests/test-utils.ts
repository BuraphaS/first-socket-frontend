import type { Component } from 'vue'
import { vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export interface IFactory extends ReturnType<typeof mount> {
  vm: any
}

vi.mock('@/resources/HttpRequest')

export function factory (component: Component): IFactory {
  return mount(component, {
    global: {
      plugins: [
        router
      ]
    },
    plugins: [
      createTestingPinia({ stubActions: false })
    ]
  })
}
