import { ProfileUserType } from './../types/types';
import { server } from "./api"

export const profileAPI = {
  async getProfile(id: number) {
    return server.get(`profile/${id}`)
      .then(response => response.data)
  },
  async getStatus(id: number) {
    return server.get(`profile/status/${id}`).then(res => res.data)
  },
  async putNewStatus(status: string) {
    return server.put(`profile/status`, { status })
  },
  async putNewPhoto(file: File) {
    const formData = new FormData()
    formData.append('image', file)

    return server.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async putNewDataProfile(data: ProfileUserType) {
    return server.put(`profile`, data).then(res => res.data)
  }
}