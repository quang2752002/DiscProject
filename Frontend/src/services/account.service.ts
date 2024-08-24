import { ApiService } from './api.service'
import 'dotenv/config'
const baseURL = process.env.BASE_URL || 'https://localhost:7090/api'
type AccountParams = {
  searchString: string
  page: number
  size: number
}

const defaultParams: AccountParams = {
  searchString: '',
  page: 1,
  size: 10,
}
class AccountService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL)
  }

  async login(params: {
    email: string
    password: string
    rememberMe: boolean
  }) {
    const response: { token: string; expiration: string } = await this.post(
      '/user/login',
      params
    )
    return response
  }

  async register(data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    const response: { token: string; expiration: string } = await this.post(
      '/user/add',
      data
    )
    return response
  }

  async getAllAccount(params: AccountParams = defaultParams) {
    const response: ResponseData<User> = await this.get('/user', params)
    return response
  }

  async getAccountById(userId: number) {
    return await this.get(`/user/${userId}`)
  }

  async createAccount(form: FormData) {
    let response = await this.post('/user/create', form)
    return response
  }

  async updateAccount(userId: number, form: FormData) {
    return await this.patch(`/user/update/${userId}`, form)
  }

  async changeAccountRole(userId: number, roleId: number) {
    let response: User = await this.patch(`/user/change-role/${userId}`, {
      roleId,
    })
    return response
  }

  async toggleStatus(userId: number) {
    let response: User = await this.patch(`/user/toggle-status/${userId}`, {})
    return response
  }

  async deleteAccount(userId: number) {
    return await this.delete(`/user/${userId}`)
  }
}

export const accountService = new AccountService(baseURL)
