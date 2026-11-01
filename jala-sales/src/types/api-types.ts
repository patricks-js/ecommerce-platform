export type Product =  {
  name: string;
  id: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  status: "available" | "unavailable";
  sellerId: string;
}

export type Products = {
  products: Product[]
}

export type Category = {
  name: string;
  id: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Categories = {
  categories: Category[]
}

export type Order = {
  status: "pending" | "sent" | "delivered" | "cancelled";
  customerId: string;
  shippingAddress: string;
  orderId: string;
  orderDate: Date;
  totalAmount: number;
}

export type Orders = {
  orders: Order[]
}

export type OrderDetail = {
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  orderId: string;
  quantity: number;
  orderDetailId: string;
  totalPrice: number;
}

export type OrderDetails = {
  orderDetails: OrderDetail[]
}

export type Seller = {
  status: "pending" | "approved" | "rejected";
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type Sellers = {
  sellers: Seller[]
}

export type User = {
  name: string;
  image: string | null;
  status: "active" | "inactive";
  role: "seller" | "customer" | "admin";
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  passwordHash: string | null;
}

export interface CreateUserSessionOutput {
  userId: string;
  accessToken: string;
  provider: "credentials" | "google";
  expiresAt: Date;
  id: string;
  issuedAt: Date;
}
