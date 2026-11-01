import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Jala Sales</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Icons.phone className="size-4 mr-2" />
              (704) 555-0127
            </li>
            <li className="flex items-center">
              <Icons.mail className="size-4 mr-2" />
              contact@jala.sales
            </li>
            <li className="flex items-center">
              <Icons.pin className="size-4 mr-2" />
              3891 Ranchview Dr. Richardson, California 62639
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <ul className="space-y-2">
            <li>My Account</li>
            <li>Login</li>
            <li>My Cart</li>
            <li>My Wishlist</li>
            <li>Checkout</li>
          </ul>
        </div>

        {/* Service Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Service</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Subscription Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="mb-4">
            Enter your email to be the first to know about new product launches.
          </p>
          <div className="flex items-center">
            <Input
              type="email"
              placeholder="Your Email"
              className="rounded-e-none"
            />
            <Button size="icon" variant="outline" className="rounded-l-none">
              <Icons.mail className="size-4 text-primary" />
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-8 bg-muted-foreground/40" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy;2024 Jala Sales. All Rights Reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0c">
          <Icons.facebook className="size-5 text-muted-foreground hover:text-primary-foreground cursor-pointer duration-200" />
          <Icons.instagram className="size-5 text-muted-foreground hover:text-primary-foreground cursor-pointer duration-200" />
          <Icons.twitter className="size-5 text-muted-foreground hover:text-primary-foreground cursor-pointer duration-200" />
        </div>
      </div>
    </footer>
  );
}
