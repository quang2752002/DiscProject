import { ApiService } from './api.service'
import 'dotenv/config'
const baseURL = process.env.BASE_URL || 'https://localhost:7090/api'
type ProductParams = {
  searchString: string
  categoryId: number
  page: number
  size: number
}

const defaultParams: ProductParams = {
  searchString: '',
  categoryId: 0,
  page: 1,
  size: 10,
}

class ProductService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL)
  }

  async getAllProducts(params: ProductParams = defaultParams) {
    const response: ResponseData<Disc> = await this.get('/product', params)
    return response
  }

  async getProductById(productId: string) {
    const response: Disc = await this.get(`/product/${productId}`)
    return response
  }

  createProduct(form: FormData) {
    return this.post('/product/add', form)
  }

  async updateProduct(form: FormData) {
    const response: Disc = await this.patch(`/product/update`, form)
    return response
  }

  async toggleStatusProduct(productId: number) {
    const response = await this.patch(`/product/status/${productId}`, [])
    return response
  }
}

export const productService = new ProductService(baseURL)
