import { AdminSignInForm } from "@/components/forms/admin-sign-in-form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminSignInPage() {
  return (
    <div className="size-full grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-secondary m-4 rounded-s-md p-10 hidden lg:block">
        <Link href="/" className="flex items-center gap-2 text-lg font-medium">
          <Icons.logo className="size-6" />
          Jala Sales
        </Link>
      </div>
      <div className="relative my-4 px-4 gap-4 flex flex-col justify-center items-center">
        <Button
          variant="ghost"
          asChild
          className="absolute right-4 top-4 md:right-4 md:top-10"
        >
          <Link href="/">Back</Link>
        </Button>
        <div className="flex flex-col space-y-2 text-center w-full">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back! 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials below to login
          </p>
        </div>
        <AdminSignInForm />
      </div>
    </div>
  );
}
