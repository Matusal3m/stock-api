import {
  sqliteTable,
  integer as int,
  text,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name", { length: 20 }).notNull(),
    email: text("email", { length: 60 }).notNull(),
    password: text("password").notNull(),
  },
  (table) => ({
    emailIndex: uniqueIndex("unique_email").on(table.email),
  })
);

export const stocks = sqliteTable(
  "stocks",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name", { length: 20 }).notNull(),
    userId: int().references(() => users.id),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
  })
);

export const categories = sqliteTable(
  "categories",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name", { length: 20 }).notNull(),
    stockId: int().references(() => stocks.id),
    userId: int().references(() => users.id),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
    stockIdIdx: index("stock_id_idx").on(table.stockId),
  })
);

export const products = sqliteTable(
  "products",
  {
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
    userId: int().references(() => users.id),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
    stockIdIdx: index("stock_id_idx").on(table.stockId),
    categoryIdIdx: index("category_id_idx").on(table.categoryId),
  })
);
