import { ApiService } from './api.service'
import 'dotenv/config'
const baseURL = process.env.BASE_URL || 'https://localhost:7090/api'
class RoleService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL)
  }

  async getAllRole() {
    const response: Role[] = await this.get('/role')
    return response
  }
}

export const roleService = new RoleService(baseURL)
