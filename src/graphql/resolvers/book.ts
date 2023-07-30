import { ApolloError, UserInputError } from "apollo-server";
import prisma from "../../db/prisma";
import { bookInputSchema } from "../../validators/book-validator";

interface BookInput {
  id?: string;
  title: string;
  author: string;
  image: string;
  country: string;
  language: string;
  pages: number;
  link: string;
  publicationYear: number;
}

export default {
  Query: {
    books: async (
      _: any,
      { page, pageSize }: { page: number; pageSize: number }
    ) => {
      const totalItems = await prisma.book.count();
      const totalPages = Math.ceil(totalItems / pageSize);
      const currentPage = Math.min(page, totalPages);

      const books = await prisma.book.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      });

      return {
        totalItems,
        totalPages,
        currentPage,
        books,
      };
    },
    book: async (_: any, { id }: { id: string }) => {
      if (!id) throw new UserInputError("Book ID is required.");
      const book = await prisma.book.findUnique({ where: { id } });
      if (!book) throw new ApolloError("Book not found.", "NOT_FOUND");
      return book;
    },
    searchBooks: async (
      _: any,
      {
        query,
        page,
        pageSize,
      }: { query: string; page: number; pageSize: number }
    ) => {
      const totalItems = await prisma.book.count({
        where: {
          OR: [{ title: { contains: query } }, { author: { contains: query } }],
        },
      });
      const totalPages = Math.ceil(totalItems / pageSize);
      const currentPage = Math.max(1, Math.min(page, totalPages));

      const books = await prisma.book.findMany({
        where: {
          OR: [{ title: { contains: query } }, { author: { contains: query } }],
        },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      });

      return {
        totalItems,
        totalPages,
        currentPage,
        books,
      };
    },
  },
  Mutation: {
    createBook: async (_: any, { book }: { book: BookInput }) => {
      try {
        await bookInputSchema.validate(book, { abortEarly: false });
        return prisma.book.create({
          data: {
            ...book,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
      } catch (error: any) {
        throw new ApolloError("Validation error", "400", {
          validationErrors: error.errors,
        });
      }
    },
    updateBook: async (
      _: any,
      { book: { id, ...book } }: { book: BookInput }
    ) => {
      try {
        await bookInputSchema.validate(book, { abortEarly: false });
        const updatedBook = await prisma.book.update({
          where: { id },
          data: book,
        });
        return updatedBook;
      } catch (error: any) {
        throw new ApolloError("Validation error", "400", {
          validationErrors: error.errors,
        });
      }
    },
    deleteBook: async (_: any, { id }: { id: string }) => {
      if (!id) throw new UserInputError("Book ID is required.");
      const book = await prisma.book.delete({ where: { id } });
      if (!book) throw new ApolloError("Book not found.", "NOT_FOUND");
      return book;
    },
  },
};
