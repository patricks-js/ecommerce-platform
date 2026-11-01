CREATE TYPE "public"."product_category" AS ENUM('electronics', 'clothing', 'furniture', 'books', 'toys', 'other');--> statement-breakpoint
CREATE TYPE "public"."product_status" AS ENUM('available', 'unavailable');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" numeric NOT NULL,
	"stock" integer NOT NULL,
	"image" text,
	"category" "product_category" NOT NULL,
	"status" "product_status" DEFAULT 'available' NOT NULL,
	"sellerId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_products" ADD CONSTRAINT "tb_products_sellerId_tb_users_id_fk" FOREIGN KEY ("sellerId") REFERENCES "public"."tb_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
