import { LoginFormType } from '../lib/types';
import { server } from "."

export const authAPI = {
  async isUserLoggedIn() {
    return server.get('auth/me').then(response => response.data)
  },
  async login(form: LoginFormType) {
    return server.post('auth/login', form).then((response) => {
      console.log(response)
      return Promise.resolve(response.data)
    })
  },
  async logOut() {
    return server.delete('auth/login')
  },
  async getCaptchaUrl() {
    return server.get('security/get-captcha-url').then(res => res.data)
  }
}