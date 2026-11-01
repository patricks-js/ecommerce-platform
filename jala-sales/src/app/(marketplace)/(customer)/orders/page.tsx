import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((order) => (
        <div
          key={faker.string.uuid()}
          className="flex items-start py-6 border-b gap-4"
        >
          <img
            src={faker.image.url()}
            alt={faker.commerce.productName()}
            className="w-20 h-20 rounded-md object-cover"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">
              {faker.commerce.productName()}
            </h3>
            <p className="text-sm">
              Qty: {faker.number.int({ min: 1, max: 4 })}
            </p>
            <p className="font-bold mt-2">${faker.commerce.price()}</p>
            <p className="mt-1">
              {faker.helpers.arrayElement(["Delivered", "In Process"]) ===
              "Delivered" ? (
                <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded-md">
                  Delivered
                </span>
              ) : (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-md">
                  In Process
                </span>
              )}
            </p>
            <p className="text-sm mt-2">
              Your product has been{" "}
              {faker.helpers.arrayElement(["Delivered", "In Process"]) ===
              "Delivered"
                ? "delivered"
                : "in process"}
              .
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="outline">View Order</Button>
            {faker.helpers.arrayElement(["Delivered", "In Process"]) ===
            "In Process" ? (
              <Button variant="destructive">Cancel Order</Button>
            ) : (
              <Button>Write A Review</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
