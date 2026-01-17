import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { accessTokenStorage, userLocalStorage } from '@/utils/Storage'

interface IUser {
  // id: number | null
  // firstName: string
  // lastName: string
  fullName: string
  // email: string
}

// interface IToken {
//   accessToken: string
//   expireIn: number | null
// }

interface IAuthStore {
  user: Ref<IUser>
  // userToken: Ref<IToken>
  userLogin(user: IUser): void
  logout (): void
}

export const useAuthStore = defineStore<'Auth', IAuthStore>('Auth', (): IAuthStore => {
  const user = ref<IUser>({
    // id: null,
    // firstName: '',
    // lastName: '',
    fullName: '',
    // email: ''
  })

  // const userToken = ref<IToken>({
  //   accessToken: '',
  //   expireIn: null
  // })

  function userLogin (userValue: IUser): void {
    user.value = userValue
    // userToken.value = tokenValue
  }

  function logout (): void {
    user.value = {
      // id: null,
      // firstName: '',
      // lastName: '',
      fullName: '',
      // email: ''
    }
    // userToken.value = {
    //   accessToken: '',
    //   expireIn: null
    // }
  }

  return {
    user,
    // userToken,
    userLogin,
    logout
  }
}, {
  persist: [
    {
      pick: ['userToken'],
      storage: accessTokenStorage
    },
    {
      pick: ['user'],
      storage: userLocalStorage
    }
  ]
})

export default { useAuthStore }
