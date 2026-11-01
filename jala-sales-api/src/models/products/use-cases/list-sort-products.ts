import type { ProductRepository } from "@/models/products/repositories/product-repository";

export interface ListSortProductsInput {
  query: string;
  sort: string;
}

export class ListSortProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ query, sort }: ListSortProductsInput) {
    return await this.productRepository.getProductsAndSort({
      query,
      sort,
    });
  }
}
