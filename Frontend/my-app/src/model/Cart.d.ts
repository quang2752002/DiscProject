export interface Cart {
    id: number;
    userId: number;
    quantity: number;
    productId: number;
    productName: string;
    productPrice: number | null; // Allow null values
    productImage: string;
    total:number;
  }