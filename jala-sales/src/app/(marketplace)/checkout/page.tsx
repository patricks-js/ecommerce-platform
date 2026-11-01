import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { faker } from "@faker-js/faker";
import { Minus, Plus, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/sign-in");
  }

  const addresses = [
    {
      id: "1",
      label: "Home Address",
      address: "123 Main St, Springfield, IL, 62701",
    },
  ];

  return (
    <section className="max-w-[1144px] mx-auto px-4 space-y-8 mt-10">
      <h2 className="text-3xl font-medium">Checkout Page</h2>
      <div className="grid grid-cols-[1fr_320px] gap-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead className="w-28">Price</TableHead>
              <TableHead className="w-32">Quantity</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map(() => (
              <TableRow key={faker.string.ulid()}>
                <TableCell className="flex items-center gap-3">
                  <img
                    src={faker.image.url()}
                    alt=""
                    className="aspect-square w-16 rounded-md"
                  />
                  <span>{faker.commerce.product()}</span>
                </TableCell>
                <TableCell>${faker.commerce.price()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Plus className="size-4" />
                    </Button>
                    <span>{faker.number.int({ min: 1, max: 4 })}</span>
                    <Button variant="ghost" size="icon">
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>${faker.commerce.price()}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="size-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <aside className="p-4 border rounded-md space-y-4">
          <header className="flex items-center pb-4 justify-between font-medium border-b">
            <h3>Subtotal:</h3>
            <span>${faker.commerce.price()}</span>
          </header>
          <div className="space-y-1">
            <Label htmlFor="code">Enter discount code</Label>
            <div className="flex items-center">
              <Input
                id="code"
                placeholder="Code"
                className="rounded-e-none h-10"
              />
              <Button size="lg" className="rounded-l-none">
                Apply
              </Button>
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <RadioGroup className="space-y-4 mb-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="flex items-start gap-4 p-4 border rounded-md"
                >
                  <RadioGroupItem
                    value={address.id}
                    id={`address-${address.id}`}
                  />
                  <Label
                    htmlFor={`address-${address.id}`}
                    className="flex flex-col"
                  >
                    <span className="font-semibold">{address.label}</span>
                    <span className="text-sm text-gray-600">
                      {address.address}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex items-center justify-between pb-4 border-b">
              <span>Delivery Change</span>
              <span>${faker.commerce.price({ min: 5, max: 30 })}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 font-medium">
            <span>Grand Total</span>
            <span>${faker.commerce.price()}</span>
          </div>
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </aside>
      </div>
    </section>
  );
}
