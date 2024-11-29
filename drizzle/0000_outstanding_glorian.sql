CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`stockId` integer,
	FOREIGN KEY (`stockId`) REFERENCES `stocks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categoryIndex` ON `category` (`id`);--> statement-breakpoint
CREATE INDEX `categoryNameIndex` ON `category` (`name`);--> statement-breakpoint
CREATE INDEX `stockIdIndex` ON `category` (`stockId`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`description` text(60),
	`quantity` integer NOT NULL,
	`categoryId` integer,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `productIndex` ON `products` (`id`);--> statement-breakpoint
CREATE INDEX `productNameIndex` ON `products` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `categoryIdIndex` ON `products` (`categoryId`);--> statement-breakpoint
CREATE TABLE `stocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stockIndex` ON `stocks` (`id`);