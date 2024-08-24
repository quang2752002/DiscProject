type Disc = {
  id: int
  name: string
  description?: string
  price: number
  author: string
  quantity: number
  isActive: boolean
  createdAt: Date
  category: Category
  attachments?: Attachment[]
  carts?: Cart[]
  orderItems?: OrderItems[]
}
