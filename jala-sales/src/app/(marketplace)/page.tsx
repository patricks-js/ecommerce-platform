import { ProductList } from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/api";
import Link from "next/link";

const TOTAL_PER_PAGE = 8;

export default async function HomePage({
  searchParams,
}: { searchParams: Promise<{ page?: string }> }) {
  const { products } = await getAllProducts();

  return (
    <div className="space-y-16">
      <section>
        <div className="bg-cover bg-hero rounded-lg h-96 flex items-center p-8">
          <div className="space-y-6">
            {/* <h1 className="text-3xl md:text-4xl lg:text-6xl text-foreground font-bold">
              Grab Up to 50% Off On <br /> Selected Headphone
            </h1> */}
            <Button size="lg" asChild>
              <Link href="/products">Buy Now</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="space-y-8">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Products</h2>
          {/* <div className="flex items-center gap-2">
            <Button size="icon" disabled={currentPage <= 1} asChild>
              <Link href={`/?page=${currentPage - 1}`}>
                <ChevronLeft className="size-5" />
              </Link>
            </Button>
            <Button size="icon" disabled={currentPage === totalPages} asChild>
              <Link href={`/?page=${currentPage + 1}`}>
                <ChevronRight className="size-5" />
              </Link>
            </Button>
          </div> */}
        </header>
        <ProductList products={products} />
      </section>
    </div>
  );
}
