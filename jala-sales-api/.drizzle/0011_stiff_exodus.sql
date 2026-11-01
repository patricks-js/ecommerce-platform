ALTER TABLE "tb_sessions" ALTER COLUMN "expires_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "tb_sessions" ALTER COLUMN "expires_at" DROP DEFAULT;