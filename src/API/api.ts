import { ProfileUserType, LoginFormType } from './../types/types';
import axios from "axios";

const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

let server = axios.create({
  baseURL,
  withCredentials: true,
  headers:{
    'API-KEY': '16d4c253-80d5-4183-b659-e3879f448d28'
  }
})

export const usersAPI = {
  async getUsers(currentPage: number, pageSize: number){
    return server.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data.items)
  },
  async getUsersCount(){
    return server.get(`users`)
    .then(response => response.data.totalCount)
  },
  async follow(id: number){
    return server.post(`follow/${id}`, {})
  },
  async unfollow(id: number){
    return server.delete(`follow/${id}`)
  }
}

export const profileAPI = {
  async getProfile(id: number){
    return server.get(`profile/${id}`)
      .then(response => response.data)
  },
  async getStatus(id: number){
    return server.get(`profile/status/${id}`)
  },
  async putNewStatus(status: string){
    return server.put(`profile/status`, {status})
  },
  async putNewPhoto(file: File){
    const formData = new FormData()
    formData.append('image', file)

    return server.put(`profile/photo`, formData, {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async putNewDataProfile(data: ProfileUserType){
    return server.put(`profile`, data).then(res => res.data)
  }

}

export const authAPI = {
  async isUserLoggedIn(){
    return server.get('auth/me').then(response => response.data)
  },
  async login(form: LoginFormType){
    return server.post('auth/login', form).then((response) => {
      console.log(response)
      return Promise.resolve(response.data)
    })
  },
  async logOut(){
    return server.delete('auth/login')
  },
  async getCaptchaUrl(){
    return server.get('security/get-captcha-url').then(res => res.data)
  }
}

