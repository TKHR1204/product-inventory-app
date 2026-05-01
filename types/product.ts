export type Category = 'Electronics' | 'Clothing' | 'Food & Drink' | 'Books' | 'Sports' | 'Home & Garden'

export type Status = 'active' | 'inactive'

export interface Product {
  id: number
  name: string
  sku: string
  category: Category
  price: number
  stock: number
  status: Status
  description: string
  accentColor: string
}
