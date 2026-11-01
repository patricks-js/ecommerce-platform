import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ConfirmationPage() {
  const session = await auth();

  if (session?.user.role !== "customer") {
    ("use server");
    redirect("/");
  }

  async function handleGoHome() {
    "use server";
    redirect("/");
  }

  return (
    <div className="h-[500px]">
      <div className="flex flex-col h-full items-center justify-center p-8 gap-6">
        <CheckCircle className="size-20 text-primary" />
        <p className="text-lg font-semibold text-center">
          Your application has been successfully submitted. Please wait for
          admin approval.
        </p>
        <Button size="lg" onClick={handleGoHome}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
