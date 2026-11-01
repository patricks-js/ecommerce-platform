ALTER TABLE "tb_seller" RENAME TO "tb_seller_applies";--> statement-breakpoint
ALTER TABLE "tb_seller_applies" DROP CONSTRAINT "tb_seller_userId_tb_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_seller_applies" ADD CONSTRAINT "tb_seller_applies_userId_tb_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
