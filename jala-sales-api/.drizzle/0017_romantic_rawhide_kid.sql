ALTER TABLE "tb_products" DROP CONSTRAINT "tb_products_categoryId_tb_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "tb_products" DROP CONSTRAINT "tb_products_sellerId_tb_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tb_categories" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tb_categories" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tb_products" ALTER COLUMN "categoryId" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_products" ADD CONSTRAINT "tb_products_categoryId_tb_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."tb_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_products" ADD CONSTRAINT "tb_products_sellerId_tb_users_id_fk" FOREIGN KEY ("sellerId") REFERENCES "public"."tb_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
