import { db } from "@/core/db";
import { users } from "@/core/db/schema";
import { seller } from "@/core/db/schema/seller";
import { and, eq } from "drizzle-orm";

export class GetPendingSellers {
  async execute() {
    const pendingSellers = await db
      .select({
        id: users.id,
        avatar: users.image,
        name: users.name,
        email: users.email,
        applicationDate: seller.createdAt,
        status: seller.status,
      })
      .from(seller)
      .leftJoin(users, eq(users.id, seller.userId))
      .where(and(eq(seller.status, "pending")));

    return pendingSellers;
  }
}
