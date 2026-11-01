ALTER TABLE "tb_order_detail" ALTER COLUMN "orderId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tb_order_detail" ALTER COLUMN "productId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tb_order_detail" ALTER COLUMN "total_price" SET DEFAULT 0;