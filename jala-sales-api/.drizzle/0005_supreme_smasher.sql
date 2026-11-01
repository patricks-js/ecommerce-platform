CREATE TYPE "public"."status" AS ENUM('active', 'inactive');--> statement-breakpoint
ALTER TABLE "tb_users" ALTER COLUMN "password_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tb_users" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "tb_users" ADD COLUMN "status" "status" DEFAULT 'active' NOT NULL;