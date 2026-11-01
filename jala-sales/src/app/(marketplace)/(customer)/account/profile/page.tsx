import { UpdateProfileForm } from "@/components/forms/update-profile-form";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user.name || !session?.user.email) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UpdateProfileForm name={session.user.name} email={session.user.email} />
      {session?.user.role === "customer" && (
        <Button asChild className="mt-10">
          <Link href="/seller-terms">Become a Seller</Link>
        </Button>
      )}
    </div>
  );
}
