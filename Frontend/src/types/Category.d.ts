type Category = {
  id: number
  name: string,
  description?: string,
  isActive: boolean,
  products:Product[],
  categoryTypes: CategoryType[]
}
