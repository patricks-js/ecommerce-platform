"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { loginWithEmailAction } from "@/app/actions/login-with-email-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "../icons";
import { SocialLoginButtons } from "../social-login-buttons";
import { PasswordInput } from "../ui/password-input";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: FormData) {
    startTransition(() =>
      loginWithEmailAction({
        email: data.email,
        password: data.password,
        origin: "user",
        redirectTo: window.location.origin,
      }),
    );
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isPending ? (
              <Icons.loader className="size-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
      <footer className="space-y-4">
        <p className="text-muted-foreground text-sm text-center">
          Doesn't have an account?{" "}
          <Button
            variant="link"
            asChild
            className="text-muted-foreground px-0 font-normal hover:text-foreground"
          >
            <Link href="/sign-up">Register now</Link>
          </Button>
        </p>
        <SocialLoginButtons isLoading={isPending} />
      </footer>
    </section>
  );
}
