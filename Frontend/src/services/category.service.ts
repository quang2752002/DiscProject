import { ApiService } from './api.service'
import 'dotenv/config'
const baseURL = process.env.BASE_URL || 'https://localhost:7090/api'
type CategoryParams = {
  searchString: string
  page: number
  size: number
}

const defaultParams: CategoryParams = {
  searchString: '',
  page: 1,
  size: 7,
}

class CategoryService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL)
  }

  async getAllCategories(params: CategoryParams = defaultParams) {
    const response: ResponseData<Category> = await this.get('/category', params)
    return response
  }

  async getCategoryById(productId: number) {
    return await this.get(`/product/${productId}`)
  }

  async createCategory(form: FormData) {
    return await this.post('/category/add', form)
  }

  async updateCategory(categoryId: string, form: FormData) {
    return await this.patch(`/category/update/${categoryId}`, form)
  }

  async toggleStatus(categoryId: string) {
    return await this.patch(`/category/toggle-status/${categoryId}`, {})
  }

  async deleteCategory(productId: number) {
    return await this.delete(`/product/${productId}`)
  }
}

export const categoryService = new CategoryService(baseURL)
