ALTER TABLE "tb_sessions" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "tb_sessions" DROP CONSTRAINT "tb_sessions_userId_tb_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_sessions" ADD CONSTRAINT "tb_sessions_user_id_tb_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tb_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
