"use client";

import { loginWithGoogleAction } from "@/app/actions/login-with-google-action";
import { useTransition } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";

type Props = {
  isLoading?: boolean;
};

export function SocialLoginButtons({ isLoading }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleGoogleAuthentication() {
    startTransition(() =>
      loginWithGoogleAction({
        redirectTo: `${window.location.origin}`,
      }),
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={handleGoogleAuthentication}
          disabled={isLoading || isPending}
          className="w-full"
        >
          {isLoading || isPending ? (
            <Icons.loader className="size-4 animate-spin" />
          ) : (
            <Icons.google className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
