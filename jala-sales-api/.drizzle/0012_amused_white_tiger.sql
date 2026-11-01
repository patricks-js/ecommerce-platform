ALTER TABLE "public"."tb_sessions" ALTER COLUMN "provider" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."provider";--> statement-breakpoint
CREATE TYPE "public"."provider" AS ENUM('credentials', 'google');--> statement-breakpoint
ALTER TABLE "public"."tb_sessions" ALTER COLUMN "provider" SET DATA TYPE "public"."provider" USING "provider"::"public"."provider";