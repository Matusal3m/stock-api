import {
  sqliteTable,
  integer as int,
  text,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";

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
    stockId: int("stockId")
      .references(() => stocks.id)
      .notNull(),
  },
  (table) => {
    return {
      productIndex: uniqueIndex("productIndex").on(table.id),
      productNameIndex: index("productNameIndex").on(table.name),
      categoryIdIndex: uniqueIndex("categoryIdIndex").on(table.categoryId),
    };
  }
);

export const categories = sqliteTable(
  "category",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name", { length: 20 }).notNull(),
    stockId: int("stockId").references(() => stocks.id),
  },
  (table) => {
    return {
      categoryIndex: uniqueIndex("categoryIndex").on(table.id),
      categoryNameIndex: index("categoryNameIndex").on(table.name),
      stockIdIndex: index("stockIdIndex").on(table.stockId),
    };
  }
);

export const stocks = sqliteTable(
  "stocks",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name", { length: 20 }).notNull(),
  },
  (table) => {
    return {
      stockIndex: uniqueIndex("stockIndex").on(table.id),
    };
  }
);
