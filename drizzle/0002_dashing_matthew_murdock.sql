CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`email` text(60) NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_email` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `categories` ADD `userId` integer REFERENCES users(id);--> statement-breakpoint
CREATE INDEX `user_id_category_idx` ON `categories` (`userId`);--> statement-breakpoint
CREATE INDEX `stock_id_category_idx` ON `categories` (`stockId`);--> statement-breakpoint
ALTER TABLE `products` ADD `userId` integer REFERENCES users(id);--> statement-breakpoint
CREATE INDEX `user_id_product_idx` ON `products` (`userId`);--> statement-breakpoint
CREATE INDEX `stock_id__product_idx` ON `products` (`stockId`);--> statement-breakpoint
CREATE INDEX `category_id_idx` ON `products` (`categoryId`);--> statement-breakpoint
ALTER TABLE `stocks` ADD `userId` integer REFERENCES users(id);--> statement-breakpoint
CREATE INDEX `user_id_stock_idx` ON `stocks` (`userId`);