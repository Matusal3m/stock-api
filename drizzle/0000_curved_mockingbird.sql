CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL,
	`stockId` integer,
	FOREIGN KEY (`stockId`) REFERENCES `stocks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
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
CREATE TABLE `stocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(20) NOT NULL
);
