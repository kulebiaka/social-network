import { server } from "./api"

export const usersAPI = {
  async getUsers(currentPage: number, pageSize: number, term?: string, friend?: boolean | string) {

    const termReq = term && term.length > 0 ? '&term=' + term : ''
    // const friendReq = friend !== undefined > 0 ? '&term=' + term : ''

    return server.get(`users?page=${currentPage}&count=${pageSize}${termReq}&friend=${friend}`)
      .then(response => response.data)
  },
  async getUsersCount() {
    return server.get(`users`)
      .then(response => response.data.totalCount)
  },
  async follow(id: number) {
    return server.post(`follow/${id}`, {})
  },
  async unfollow(id: number) {
    return server.delete(`follow/${id}`)
  }
}