type Order = {
  id: int,
  user: User
  orderDate: Date
  paymentMethod: string
  isActive: boolean,
  transaction: string
  orderItems: OrderItem[],
  total: number
}
