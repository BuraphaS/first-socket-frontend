import { type ComponentOptions } from 'vue'

export default {
  path: '/bingo',
  component: (): ComponentOptions => import('@/pages/BingoLineup/BingoPage.vue'),
  children: [
    // {
    //   path: '',
    //   name: 'BingoPage',
    //   redirect: {
    //     name: 'BingoPage'
    //   }
    // },
    {
      path: '',
      name: 'BingoPage',
      component: (): ComponentOptions => import('@/pages/BingoLineup/pages/BingoPage.vue'),
    },
    // {
    //   path: 'logout',
    //   name: 'LogoutPage',
    //   component: (): ComponentOptions => import('@/pages/auth/pages/LogoutPage.vue'),
    //   meta: {
    //     layout: 'blank'
    //   }
    // },
    // {
    //   path: 'forgot-password',
    //   name: 'ForgotPasswordPage',
    //   component: (): ComponentOptions => import('@/pages/auth/pages/ForgotPasswordPage.vue'),
    //   meta: {
    //     layout: 'blank'
    //   }
    // },
    // {
    //   path: 'reset-password',
    //   name: 'ResetPasswordPage',
    //   component: (): ComponentOptions => import('@/pages/auth/pages/ResetPasswordPage.vue'),
    //   meta: {
    //     layout: 'blank'
    //   }
    // }
  ]
}
