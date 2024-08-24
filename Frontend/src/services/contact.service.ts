import { ApiService } from './api.service'
import 'dotenv/config'
const baseURL = process.env.BASE_URL || 'https://localhost:7090/api'
type ContactParams = {
  fromDate: string
  toDate: string
  searchString: string
  page: number
  size: number
}

const defaultParams: ContactParams = {
  fromDate: '',
  toDate: '',
  searchString: '',
  page: 1,
  size: 10,
}

class ContactService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL)
  }

  async getAllContacts(params: ContactParams = defaultParams) {
    const response: ResponseData<Contact> = await this.get('/contact', params)
    return response
  }
  async removeContact(contactId: number) {
    const response = await this.delete(`/contact/remove/${contactId}`)
    return response
  }

  async changeContactStatus(id: number, status: number) {
    return await this.patch(`/contact/change-status/${id}`, { status })
  }

  // async updateType(typeId: string, form: FormData) {
  //   return await this.patch(`/type/update/${typeId}`, form)
  // }

  // async toggleStatus(typeId: string) {
  //   return await this.patch(`/type/toggle-status/${typeId}`, {})
  // }
}

export const contactService = new ContactService(baseURL)
