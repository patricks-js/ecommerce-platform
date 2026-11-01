"use server";

import type { Product, Products, Seller, User } from "@/types/api-types";
import { auth } from "./auth";

async function authFetcher(url: string, options?: RequestInit) {
  const session = await auth();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  return response;
}

export async function getAllProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  const data = await response.json();

  console.log(data);

  return { products: data } as Products;
}

export async function applyForSellerRole() {
  const response = await authFetcher("/seller/apply", {
    headers: {
      method: "POST",
    },
  });

  const data = await response.json();

  console.log(data);

  return data as Seller;
}

export async function getPendingSellers() {
  const response = await authFetcher("/seller/admin/pending-sellers");

  const data = await response.json();

  console.log(data);

  return data as {
    id: string;
    avatar: string;
    name: string;
    email: string;
    applicationDate: Date;
    status: "pending" | "approved" | "rejected";
  }[];
}

export async function getAllUsers() {
  const response = await authFetcher("/users");

  const data = await response.json();

  return data as User[];
}

export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const response = await authFetcher("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.ok;
}

export async function getProductById(id: string) {
  const response = await authFetcher(`/products/${id}`);

  const data = await response.json();

  console.log(data);

  return data as Product;
}
