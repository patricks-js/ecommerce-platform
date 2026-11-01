ALTER TABLE "tb_sessions" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_sessions" ADD CONSTRAINT "tb_sessions_userId_tb_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
