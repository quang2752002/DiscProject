// Define a TypeScript interface for the product
export interface Product {
  id: number; 
  name: string; 
  description?: string; 
  categoryId: number;
  categoryName:string;
  price: number; 
  author: string;
  quantity?: number;
  isActive?: boolean; 
  attachments?: string[]; 
  path:string;
}
