CREATE TYPE "public"."order_status" AS ENUM('pending', 'sent', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_order_detail" (
	"orderDetailId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderId" uuid,
	"productId" uuid,
	"quantity" integer DEFAULT 1 NOT NULL,
	"total_price" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_order" (
	"orderId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer" uuid NOT NULL,
	"order_at" timestamp DEFAULT now() NOT NULL,
	"total_amount" real,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"shipping_address" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_order_detail" ADD CONSTRAINT "tb_order_detail_orderId_tb_order_orderId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."tb_order"("orderId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_order_detail" ADD CONSTRAINT "tb_order_detail_productId_tb_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."tb_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_order" ADD CONSTRAINT "tb_order_customer_tb_users_id_fk" FOREIGN KEY ("customer") REFERENCES "public"."tb_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
