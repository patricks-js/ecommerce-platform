CREATE TYPE "public"."provider" AS ENUM('email', 'google');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" "provider" NOT NULL,
	"access_token" text NOT NULL,
	"issued_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp DEFAULT now() NOT NULL
);
