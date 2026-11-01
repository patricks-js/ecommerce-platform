import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/api";
import { faker } from "@faker-js/faker";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Heart, Minus, Plus, Star } from "lucide-react";

type ProductData = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  status: "available" | "unavailable";
  sellerId: string;
};

export default async function Product({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const productData = await getProductById(id);

  return (
    <section className="max-w-[1144px] mx-auto px-4 space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <img
          src={productData.image ?? ""}
          alt="Product X"
          className="aspect-square w-full max-w-lg"
        />
        <div className="space-y-8">
          <header className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight leading-tight">
                {productData.name}
              </h2>
              <span className="inline-flex text-lg">
                {productData.categoryId}
              </span>
              <div className="flex items-center gap-1">
                <StarFilledIcon className="size-5" />
                <StarFilledIcon className="size-5" />
                <StarFilledIcon className="size-5" />
                <Star className="size-5" />
                <Star className="size-5" />
              </div>
            </div>
            <Badge>{productData.status}</Badge>
          </header>
          <div className="space-y-4">
            <div className="grid grid-cols-[144px_1fr] w-full items-center">
              <p className="text-muted-foreground">Price</p>
              <span className="text-lg font-medium">${productData.price}</span>
            </div>
            <div className="grid grid-cols-[144px_1fr] w-full items-center">
              <p className="text-muted-foreground">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Plus className="size-4" />
                  </Button>
                  <span className="font-medium">1</span>
                  <Button variant="ghost" size="icon">
                    <Minus className="size-4" />
                  </Button>
                </div>
                <span>{productData.stock} products available</span>
              </div>
            </div>
          </div>
          <p>{productData.description}</p>
          <div className="flex items-center gap-2">
            <Button size="lg" className="w-full max-w-xs">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="size-10">
              <Heart className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
        <ul className="flex flex-col gap-4">
          <li className="space-y-3 pb-4 border-b">
            <header className="flex items-center gap-3">
              <img
                src={faker.image.avatar()}
                alt=""
                className="aspect-square w-12 rounded-full"
              />
              <div>
                <p>Make Williams</p>
                <div className="flex items-center gap-1">
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <Star className="size-4" />
                  <Star className="size-4" />
                </div>
              </div>
            </header>
            <p className="font-medium">Excellent Product, I Love it 😍</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              quisquam aliquam facere vitae, similique facilis sint ipsam quod,
              ratione aperiam reprehenderit eius rerum voluptatum.
            </p>
          </li>
          <li className="space-y-3 pb-4 border-b">
            <header className="flex items-center gap-3">
              <img
                src={faker.image.avatar()}
                alt=""
                className="aspect-square w-12 rounded-full"
              />
              <div>
                <p>Make Williams</p>
                <div className="flex items-center gap-1">
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <Star className="size-4" />
                  <Star className="size-4" />
                </div>
              </div>
            </header>
            <p className="font-medium">Excellent Product, I Love it 😍</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              quisquam aliquam facere vitae, similique facilis sint ipsam quod,
              ratione aperiam reprehenderit eius rerum voluptatum.
            </p>
          </li>
          <li className="space-y-3 pb-4 border-b">
            <header className="flex items-center gap-3">
              <img
                src={faker.image.avatar()}
                alt=""
                className="aspect-square w-12 rounded-full"
              />
              <div>
                <p>Make Williams</p>
                <div className="flex items-center gap-1">
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <Star className="size-4" />
                  <Star className="size-4" />
                </div>
              </div>
            </header>
            <p className="font-medium">Excellent Product, I Love it 😍</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              quisquam aliquam facere vitae, similique facilis sint ipsam quod,
              ratione aperiam reprehenderit eius rerum voluptatum.
            </p>
          </li>
          <li className="space-y-3 pb-4 border-b">
            <header className="flex items-center gap-3">
              <img
                src={faker.image.avatar()}
                alt=""
                className="aspect-square w-12 rounded-full"
              />
              <div>
                <p>Make Williams</p>
                <div className="flex items-center gap-1">
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <StarFilledIcon className="size-4" />
                  <Star className="size-4" />
                  <Star className="size-4" />
                </div>
              </div>
            </header>
            <p className="font-medium">Excellent Product, I Love it 😍</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              quisquam aliquam facere vitae, similique facilis sint ipsam quod,
              ratione aperiam reprehenderit eius rerum voluptatum.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
