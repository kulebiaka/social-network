import axios from "axios";

const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

export const server = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'API-KEY': '16d4c253-80d5-4183-b659-e3879f448d28'
  }
})




