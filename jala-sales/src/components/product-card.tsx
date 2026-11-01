import type { Product } from "@/types/api-types";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-2 z-10 rounded-full"
      >
        <Icons.favorite className="size-5" />
      </Button>
      <div className="space-y-4 w-full">
        <Link
          href={`/products/${product.id}`}
          className="flex aspect-square relative bg-secondary rounded-lg overflow-hidden"
        >
          <Image src={product.image ?? ""} alt={product.name} fill={true} />
        </Link>
        <div className="flex justify-between items-start gap-4">
          <Link href={`/products/${product.id}`}>
            <h3 title={product.name} className="font-semibold line-clamp-1">
              {product.name}
            </h3>
            <p
              title={product.description ?? ""}
              className="text-sm text-muted-foreground line-clamp-1"
            >
              {product.description}
            </p>
          </Link>
          <span title={`$${product.price}`} className="font-bold">
            ${product.price}
          </span>
        </div>
        <footer>
          <Button size="lg">Add to Cart</Button>
        </footer>
      </div>
    </div>
  );
}
