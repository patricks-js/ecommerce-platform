"use client";

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
import { toast } from "@/hooks/use-toast";
import { env } from "@/lib/env";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  name: string;
  email: string;
};

export function UpdateProfileForm({ name, email }: Props) {
  const { data: session } = useSession();

  console.log(session);

  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(
    session?.user.image,
  );
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      email: email,
    },
  });

  async function onSubmit(values: FormData) {
    try {
      console.log("Form data:", values);

      await fetch(`${env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          ...values,
          image: session?.user.image ?? null,
        }),
      });

      if (!avatarFile) {
        toast({
          title: "Form submitted",
          description: "Your profile details have been updated.",
        });
        return;
      }

      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from("profile-image")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      if (data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("profile-image").getPublicUrl(data.path);

        await fetch(`${env.NEXT_PUBLIC_API_URL}/users/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            ...values,
            image: publicUrl,
          }),
        });

        setAvatarUrl(publicUrl);
        toast({
          title: "Profile updated successfully",
          description:
            "Your profile details have been updated, including your avatar.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to upload avatar",
        variant: "destructive",
      });
      console.error("Form submission error", error);
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAvatarFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <Label className="sr-only">Avatar</Label>
          <button
            type="button"
            onClick={handleAvatarClick}
            className="relative group cursor-pointer"
          >
            <Avatar className="size-24 border">
              <AvatarImage src={avatarUrl ?? ""} alt="Profile picture" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="absolute right-0 bottom-0 rounded-full bg-primary p-1 shadow-sm">
              <Edit className="size-4 text-primary-foreground" />
            </div>
          </button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button type="submit" size="lg">
            Save Profile
          </Button>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
