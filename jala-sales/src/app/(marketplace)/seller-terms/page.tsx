import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ConfirmSellerTerms } from "./confirm-seller-terms";

export default async function SellerTermsPage() {
  const session = await auth();

  if (session?.user.role !== "customer") {
    ("use server");
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Seller Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] mb-10">
            <p className="text-lg">
              Welcome to our marketplace! Before proceeding with your
              application to become a seller, please carefully read the
              following terms and conditions. By accepting these terms, you
              agree to comply with our policies and guidelines to ensure a
              positive experience for all users.
              <br />
              <br />
              As a seller, you will be responsible for maintaining the quality
              of the products or services you list. You are also expected to
              provide accurate descriptions and comply with our customer service
              standards. Failure to meet these requirements may result in the
              suspension or termination of your seller account.
              <br />
              <br />
              You understand that our marketplace charges a commission fee for
              each sale. This fee helps us maintain and improve the platform,
              provide marketing support, and offer customer support for your
              buyers. Details of the commission fee and payment schedule are
              available in your seller dashboard.
              <br />
              <br />
              By clicking "Confirm", you acknowledge that you have read,
              understood, and agree to abide by all the rules and policies
              outlined in these terms. You also agree that your continued use of
              our platform as a seller is contingent upon adhering to these
              standards.
              <br />
              <br />
              If you do not agree with these terms, you may click "Cancel" to
              exit the application process. Thank you for your interest in
              joining our marketplace as a valued seller!
            </p>
          </ScrollArea>
          <ConfirmSellerTerms />
        </CardContent>
      </Card>
    </div>
  );
}
