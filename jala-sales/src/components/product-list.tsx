import type { Product } from "@/types/api-types";
import { ProductCard } from "./product-card";

type Props = {
  products: Product[];
};

export function ProductList({ products }: Props) {
  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard key={product.id} product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
