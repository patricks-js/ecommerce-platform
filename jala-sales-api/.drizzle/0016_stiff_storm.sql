CREATE TABLE IF NOT EXISTS "tb_categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
-- statement-breakpoint

ALTER TABLE "tb_products" RENAME COLUMN "category" TO "categoryId";
-- statement-breakpoint

ALTER TABLE "tb_products" ALTER COLUMN "categoryId" SET DATA TYPE uuid USING ("categoryId"::text)::uuid;
-- statement-breakpoint

DO $$ BEGIN
 ALTER TABLE "tb_products" ADD CONSTRAINT "tb_products_categoryId_tb_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."tb_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
-- statement-breakpoint

DROP TYPE "public"."product_category";