import { users, categories, products, stocks } from "./schema.ts";
import { faker } from "@faker-js/faker";
import { database } from "./connection.ts";
import "dotenv/config";

async function seedUser() {
  const usersData: (typeof users.$inferInsert)[] = [];

  usersData.push({
    id: 1,
    name: "admin",
    password: "admin",
    email: "admin@teste.com",
  });

  await database.insert(users).values(usersData);
}

async function seedProducts(
  n: number,
  stockScope: number,
  categoriesScope: number,
  userScope: number
) {
  const productsData: (typeof products.$inferInsert)[] = [];

  for (let i = 0; i < n; i++) {
    productsData.push({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      quantity: faker.number.int({ min: 1, max: 120 }),
      categoryId: faker.number.int({ min: 1, max: categoriesScope }),
      stockId: faker.number.int({ min: 1, max: stockScope }),
      userId: faker.number.int({ min: 1, max: userScope }),
    });
  }

  await database.insert(products).values(productsData);
}

async function seedCategories(
  n: number,
  stockScope: number,
  userScope: number
) {
  const categoriesData: (typeof categories.$inferInsert)[] = [];

  for (let i = 0; i < n; i++) {
    categoriesData.push({
      name: faker.commerce.product(),
      stockId: faker.number.int({ min: 1, max: stockScope }),
      userId: faker.number.int({ min: 1, max: userScope }),
    });
  }

  await database.insert(categories).values(categoriesData);
}

async function seedStocks(n: number, userScope: number) {
  const stocksData: (typeof stocks.$inferInsert)[] = [];

  for (let i = 0; i < n; i++) {
    stocksData.push({
      name: faker.commerce.product(),
      userId: faker.number.int({ min: 1, max: userScope }),
    });
  }

  await database.insert(stocks).values(stocksData);
}

(async () => {
  const STOCKS_QUANTITY = 5;
  const CATEGORIES_QUANTITY = 50;
  const PRODUCTS_QUANTITY = 1000;

  await seedUser();

  await seedStocks(STOCKS_QUANTITY, 1);
  await seedCategories(CATEGORIES_QUANTITY, STOCKS_QUANTITY, 1);
  await seedProducts(
    PRODUCTS_QUANTITY,
    STOCKS_QUANTITY,
    CATEGORIES_QUANTITY,
    1
  );
})();
