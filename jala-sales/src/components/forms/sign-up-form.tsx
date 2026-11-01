"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

import { signUpAction } from "@/app/actions/sign-up-actions";
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
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { SocialLoginButtons } from "../social-login-buttons";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function SignUpForm() {
  const redirect = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => signUpAction(data),
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "You can now login with your new account",
      });

      form.reset();
      redirect.push("/sign-in");
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormData) {
    mutate(values);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" type="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
      <footer className="space-y-4">
        <p className="text-muted-foreground text-sm text-center">
          Already have an account?{" "}
          <Button
            variant="link"
            asChild
            className="text-muted-foreground px-0 font-normal hover:text-foreground"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </p>
        <SocialLoginButtons isLoading={isPending} />
      </footer>
    </section>
  );
}
