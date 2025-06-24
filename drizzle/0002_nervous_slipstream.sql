PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_classes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_id` integer NOT NULL,
	`date` text NOT NULL,
	`duration_minutes` integer NOT NULL,
	`topic` text NOT NULL,
	`pack_id` integer,
	`price` integer NOT NULL,
	`notes` text NOT NULL,
	`is_paid` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT '"2025-06-24T14:56:23.963Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-06-24T14:56:23.963Z"' NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`pack_id`) REFERENCES `packs`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_classes`("id", "student_id", "date", "duration_minutes", "topic", "pack_id", "price", "notes", "is_paid", "created_at", "updated_at") SELECT "id", "student_id", "date", "duration_minutes", "topic", "pack_id", "price", "notes", "is_paid", "created_at", "updated_at" FROM `classes`;--> statement-breakpoint
DROP TABLE `classes`;--> statement-breakpoint
ALTER TABLE `__new_classes` RENAME TO `classes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_packs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_id` integer NOT NULL,
	`purchase_date` text NOT NULL,
	`total_classes` integer NOT NULL,
	`total_price` integer NOT NULL,
	`notes` text,
	`created_at` integer DEFAULT '"2025-06-24T14:56:23.964Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-06-24T14:56:23.964Z"' NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_packs`("id", "student_id", "purchase_date", "total_classes", "total_price", "notes", "created_at", "updated_at") SELECT "id", "student_id", "purchase_date", "total_classes", "total_price", "notes", "created_at", "updated_at" FROM `packs`;--> statement-breakpoint
DROP TABLE `packs`;--> statement-breakpoint
ALTER TABLE `__new_packs` RENAME TO `packs`;--> statement-breakpoint
CREATE TABLE `__new_students` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`notes` text,
	`avatar_url` text,
	`created_at` integer DEFAULT '"2025-06-24T14:56:23.963Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-06-24T14:56:23.963Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_students`("id", "name", "email", "notes", "avatar_url", "created_at", "updated_at") SELECT "id", "name", "email", "notes", "avatar_url", "created_at", "updated_at" FROM `students`;--> statement-breakpoint
DROP TABLE `students`;--> statement-breakpoint
ALTER TABLE `__new_students` RENAME TO `students`;--> statement-breakpoint
CREATE UNIQUE INDEX `students_email_unique` ON `students` (`email`);