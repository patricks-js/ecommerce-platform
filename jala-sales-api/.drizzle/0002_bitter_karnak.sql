CREATE TYPE "public"."role" AS ENUM('customer', 'seller', 'admin');--> statement-breakpoint
ALTER TABLE "tb_users" ADD COLUMN "role" "role" DEFAULT 'customer' NOT NULL;