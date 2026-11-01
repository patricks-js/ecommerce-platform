"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { applyForSellerRole } from "@/lib/api";
import { wait } from "@/lib/wait";
import { useRouter } from "next/navigation";

export function ConfirmSellerTerms() {
  const router = useRouter();

  async function handlerCancel() {
    toast({
      title: "Seller Terms Confirmation",
      description: "You have cancelled the Seller Terms Confirmation",
      variant: "destructive",
    });

    await wait(1000);
    router.push("/");
  }

  async function handlerAcceptance() {
    const success = await applyForSellerRole();

    if (!success) {
      toast({
        title: "Seller Terms Confirmation",
        description: "Failed to confirm Seller Terms",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Seller Terms Confirmation",
      description: "You have confirmed the Seller Terms",
    });

    await wait(1000);
    router.push("/seller-terms/confirmation");
  }

  return (
    <div className="flex justify-end space-x-4">
      <Button variant="destructive" size="lg" onClick={handlerCancel}>
        Cancel
      </Button>
      <Button size="lg" onClick={handlerAcceptance}>
        Confirm
      </Button>
    </div>
  );
}
