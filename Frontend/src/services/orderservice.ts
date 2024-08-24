import { ApiService } from './api.service'
import 'dotenv/config'
const baseURL = process.env.BASE_URL || 'https://localhost:7090/api'
type OrderParams = {
  fromDate: string
  toDate: string
  searchString: string
  page: number
  size: number
}

const defaultParams: OrderParams = {
  fromDate: '',
  toDate: '',
  searchString: '',
  page: 1,
  size: 10,
}
class OrderService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL)
  }

  async getAllOrders(params: OrderParams = defaultParams) {
    const response: ResponseData<Order> = await this.get('/order', params)
    return response
  }
  async changeOrderTransition(orderId: number, transactionCode: number) {
    return await this.patch(`/order/change-transaction/${orderId}`, {
      transactionCode,
    })
  }
  async toggleOrderStatus(orderId: number) {
    return await this.patch(`/order/change-status/${orderId}`, {})
  }
}

export const orderService = new OrderService(baseURL)
