import { CategoriesSelector } from "@/components/categories-selector";
import PriceRangeSlider from "@/components/price-range-slider";
import { ProductList } from "@/components/product-list";
import { ProductsFiltersHeader } from "@/components/products-filters-header";
import { getAllProducts } from "@/lib/api";

export default async function ProductsPage({
  searchParams,
}: { searchParams: Promise<{ name?: string }> }) {
  const productName = (await searchParams).name;

  const { products } = await getAllProducts();

  return (
    <div className="grid grid-cols-[240px_1fr] gap-12 relative">
      <aside className="sticky top-0 left-0">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
            Product Categories
          </h2>
          <CategoriesSelector />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
          <PriceRangeSlider />
        </div>
      </aside>
      <section>
        <ProductsFiltersHeader />
        <ProductList products={products} />
      </section>
    </div>
  );
}
