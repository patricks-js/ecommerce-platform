import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function CartPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Icons.cart className="size-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          {/* <p className="text-center text-muted-foreground text-sm">
            Cart is empty
          </p> */}
          <p>You have 3 items in your cart</p>
          <ul className="space-y-2">
            <ProductCart name="Item 1" price={256} quantity={4} />
            <ProductCart name="Item 1" price={256} quantity={4} />
            <ProductCart name="Item 1" price={256} quantity={4} />
          </ul>
          <footer className="space-y-3">
            <header className="flex items-center justify-between font-semibold">
              <h4>Subtotal</h4>
              <p>$200.00</p>
            </header>
            <div className="flex flex-col gap-2">
              <Button size="lg" asChild className="w-full">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}

type ProductCartProps = {
  id?: string;
  image?: string;
  name: string;
  price: number;
  quantity: number;
};

export function ProductCart({
  id,
  image,
  name,
  price,
  quantity,
}: ProductCartProps) {
  return (
    <li className="flex justify-between items-end border-b pb-2">
      <Link href={`/products/${id}`} className="flex items-start gap-2 flex-1">
        <img src={image} alt={name} className="aspect-square w-14" />
        <div>
          <p>{name}</p>
          <span className="font-semibold text-sm">
            {quantity} x {price}
          </span>
        </div>
      </Link>
      <Button variant="ghost" size="icon">
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </li>
  );
}
