PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`description` text(60),
	`quantity` integer NOT NULL,
	`categoryId` integer NOT NULL,
	`stockId` integer NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`stockId`) REFERENCES `stocks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "description", "quantity", "categoryId", "stockId") SELECT "id", "name", "description", "quantity", "categoryId", "stockId" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `productIndex` ON `products` (`id`);--> statement-breakpoint
CREATE INDEX `productNameIndex` ON `products` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `categoryIdIndex` ON `products` (`categoryId`);