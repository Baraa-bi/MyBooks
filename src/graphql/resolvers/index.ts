// resolvers/index.js

import { authenticatedResolver } from "../../utils/auth";
import bookResolvers from "./book";
import userResolvers from "./user";

export default {
  Query: {
    ...bookResolvers.Query,
  },
  Mutation: {
    createBook: authenticatedResolver(bookResolvers.Mutation.createBook),
    updateBook: authenticatedResolver(bookResolvers.Mutation.updateBook),
    deleteBook: authenticatedResolver(bookResolvers.Mutation.deleteBook),
    ...userResolvers.Mutation,
  },
};
