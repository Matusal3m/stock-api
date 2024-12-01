import {
  sqliteTable,
  integer as int,
  text,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";

export const stocks = sqliteTable("stocks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text("name", { length: 20 }).notNull(),
});

export const categories = sqliteTable("categories", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text("name", { length: 20 }).notNull(),
  stockId: int().references(() => stocks.id),
});

export const products = sqliteTable("products", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text("name", { length: 20 }).notNull(),
  description: text("description", { length: 60 }),
  quantity: int("quantity", { mode: "number" }).notNull(),
  categoryId: int("categoryId")
    .references(() => categories.id)
    .notNull(),
  stockId: int()
    .references(() => stocks.id)
    .notNull(),
});
