import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const studentsTable = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  notes: text('notes'),
  avatarUrl: text('avatar_url'),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()).notNull(),

});
export type StudentEntity = typeof studentsTable.$inferSelect;

export const classesTable = sqliteTable('classes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').notNull().references(() => studentsTable.id, { onDelete: 'cascade' }),
  date: text('date').notNull(), // ISO date string
  durationMinutes: integer('duration_minutes').notNull(),
  topic: text('topic').notNull(),
  packId: integer('pack_id').references(() => packsTable.id, { onDelete: 'set null' }),
  price: integer('price').notNull(),
  notes: text('notes').notNull(),
  isPaid: integer('is_paid').notNull().default(0), // 0 for false, 1 for true
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()).notNull(),

});

// Export Class to use as an interface in your app
export type ClassEntity = typeof classesTable.$inferSelect;


export const packsTable = sqliteTable('packs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').notNull().references(() => studentsTable.id, { onDelete: 'cascade' }),
  purchaseDate: text('purchase_date').notNull(), // ISO date string
  totalClasses: integer('total_classes').notNull(),
  totalPrice: integer('total_price').notNull(),
  notes: text('notes'),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()).notNull(),

});

export type PackEntity = typeof packsTable.$inferSelect;
