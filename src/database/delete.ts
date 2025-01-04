import { database } from "./connection";
import { categories, products, stocks, users } from "./schema";

async function main() {
  const deletePromisses = [
    database.delete(users),
    database.delete(categories),
    database.delete(products),
    database.delete(stocks),
  ];

  await Promise.all(deletePromisses);
}

main();
