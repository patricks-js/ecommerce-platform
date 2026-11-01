import { SignUpForm } from "@/components/forms/sign-up-form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="size-full grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-secondary m-4 rounded-s-md p-10 hidden lg:block">
        <Link href="/" className="flex items-center gap-2 text-lg font-medium">
          <Icons.logo className="size-6" />
          Jala Sales
        </Link>
      </div>
      <div className="relative my-4 px-4 grid place-content-center gap-4">
        <Button
          variant="ghost"
          asChild
          className="absolute right-4 top-4 md:right-4 md:top-10"
        >
          <Link href="/">Back</Link>
        </Button>
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials below to create your account
          </p>
        </div>
        <SignUpForm />
        <footer className="px-8 max-w-md">
          <p className="text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
