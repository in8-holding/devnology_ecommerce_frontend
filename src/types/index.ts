export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  provider: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  products: CartItem[];
  createdAt: string;
}