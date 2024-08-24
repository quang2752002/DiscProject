import { ApiService } from './api.service'
import 'dotenv/config'
const baseURL = process.env.BASE_URL || 'https://localhost:7090/api'
type TypeParams = {
  searchString: string
  page: number
  size: number
}

const defaultParams: TypeParams = {
  searchString: '',
  page: 1,
  size: 7,
}

class TypeService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL)
  }

  async getAllTypes(params: TypeParams = defaultParams) {
    const response: ResponseData<Type> = await this.get('/type', params)
    return response
  }
  async createType(form: FormData) {
    return await this.post('/type/add', form)
  }

  async updateType(typeId: string, form: FormData) {
    return await this.patch(`/type/update/${typeId}`, form)
  }

  async toggleStatus(typeId: string) {
    return await this.patch(`/type/toggle-status/${typeId}`, {})
  }
}

export const typeService = new TypeService(baseURL)
