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
  async getUsers(currentPage, pageSize){
    return server.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data.items)
  },
  async getUsersCount(){
    return server.get(`users`)
    .then(response => response.data.totalCount)
  },
  async follow(id){
    return server.post(`follow/${id}`, {})
  },
  async unfollow(id){
    return server.delete(`follow/${id}`)
  }
}

export const profileAPI = {
  async getProfile(id){
    return server.get(`profile/${id}`)
      .then(response => response.data)
  }
}

export const authAPI = {
  async isUserLoggedIn(){
    return server.get('auth/me').then(response => response.data)
  }
}