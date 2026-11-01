import { ProductCard } from "@/components/product-card";
import { getCachedProducts } from "@/lib/faker";

export default async function WishlistPage() {
  const products = await getCachedProducts();

  return (
    <div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard key={product.id} product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
