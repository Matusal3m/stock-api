import { users, categories, products, stocks } from "./schema.ts";
import { faker } from "@faker-js/faker";
import { database } from "./connection.ts";
import "dotenv/config";

async function seedUsers(n: number) {
  const usersData: (typeof users.$inferInsert)[] = [];

  for (let i = 0; i < n; i++) {
    usersData.push({
      name: faker.person.firstName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    });
  }

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
  const USER_QUANTITY = 1;
  const STOCKS_QUANTITY = 5;
  const CATEGORIES_QUANTITY = 50;
  const PRODUCTS_QUANTITY = 1000;

  await seedUsers(USER_QUANTITY);

  await seedStocks(STOCKS_QUANTITY, USER_QUANTITY);
  await seedCategories(CATEGORIES_QUANTITY, STOCKS_QUANTITY, USER_QUANTITY);
  await seedProducts(
    PRODUCTS_QUANTITY,
    STOCKS_QUANTITY,
    CATEGORIES_QUANTITY,
    USER_QUANTITY
  );
})();
