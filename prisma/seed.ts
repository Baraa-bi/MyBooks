import BOOKS_DATA from "./books.json";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const IMAEG_BASE_URL =
  "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static";

const data = BOOKS_DATA.map((book) => {
  return { ...book, image: `${IMAEG_BASE_URL}/${book.image}` };
});

async function main() {
  const books = await prisma.book.createMany({ data });
  console.log({ books });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
