CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`stockId` integer,
	`userId` integer,
	FOREIGN KEY (`stockId`) REFERENCES `stocks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_id_category_idx` ON `categories` (`userId`);--> statement-breakpoint
CREATE INDEX `stock_id_category_idx` ON `categories` (`stockId`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`description` text(60),
	`quantity` integer NOT NULL,
	`categoryId` integer NOT NULL,
	`stockId` integer NOT NULL,
	`userId` integer,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`stockId`) REFERENCES `stocks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_id_product_idx` ON `products` (`userId`);--> statement-breakpoint
CREATE INDEX `stock_id__product_idx` ON `products` (`stockId`);--> statement-breakpoint
CREATE INDEX `category_id_idx` ON `products` (`categoryId`);--> statement-breakpoint
CREATE TABLE `stocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`userId` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_id_stock_idx` ON `stocks` (`userId`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`email` text(60) NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_email` ON `users` (`email`);