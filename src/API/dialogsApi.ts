import { server } from "."

export const dialogsApi = {
  async getDialogs() {
    return server.get(`/dialogs`)
      .then(response => response.data)
  },
  async getDialogById(id: number | string) {
    return server.get(`/dialogs/${id}/messages`)
      .then(response => response.data)
  },
  async sendMessage(id: any, message: string) {
    return server.post(`/dialogs/${id}/messages`, { body: message })
      .then(response => response.data)
  },
  async createDialog(id: any) {
    return server.put(`/dialogs/${id}`)
      .then(response => response.data)
  }
}