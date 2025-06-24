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
	`created_at` integer DEFAULT '"2025-06-24T11:19:26.763Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-06-24T11:19:26.763Z"' NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`pack_id`) REFERENCES `packs`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_classes`("id", "student_id", "date", "duration_minutes", "topic", "pack_id", "price", "notes", "created_at", "updated_at") SELECT "id", "student_id", "date", "duration_minutes", "topic", "pack_id", "price", "notes", "created_at", "updated_at" FROM `classes`;--> statement-breakpoint
DROP TABLE `classes`;--> statement-breakpoint
ALTER TABLE `__new_classes` RENAME TO `classes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `packs` ADD `created_at` integer DEFAULT '"2025-06-24T11:19:26.763Z"' NOT NULL;--> statement-breakpoint
ALTER TABLE `packs` ADD `updated_at` integer DEFAULT '"2025-06-24T11:19:26.763Z"' NOT NULL;--> statement-breakpoint
ALTER TABLE `students` ADD `created_at` integer DEFAULT '"2025-06-24T11:19:26.762Z"' NOT NULL;--> statement-breakpoint
ALTER TABLE `students` ADD `updated_at` integer DEFAULT '"2025-06-24T11:19:26.762Z"' NOT NULL;