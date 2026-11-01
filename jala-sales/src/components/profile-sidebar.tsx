import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { ProfileSidebarNav } from "./profile-sidebar-nav";

export async function ProfileSidebar() {
  const session = await auth();

  if (session?.user.image === null) {
    session.user.image = undefined;
  }
  return (
    <aside className="border max-h-max">
      <div className="flex items-center gap-2 p-4 border-b">
        <Avatar>
          <AvatarImage src={session?.user.image} width={66} height={66} />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="inline-flex text-sm">Hello 👋</span>
          <span className="font-semibold">{session?.user.name}</span>
        </div>
      </div>
      <ProfileSidebarNav />
    </aside>
  );
}
