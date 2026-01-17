import { describe, expect, it } from 'vitest'
import { factory } from './test-utils'

import App from '@/App.vue'

describe('App.vue', (): void => {
  it('Should mount', (): void => {
    const wrapper = factory(App)
    expect(wrapper.text).toBeTruthy()
  })
})
