// utils/auth.js

import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ApolloContext, ResolverFn } from "../graphql/types";

const jwt = require("jsonwebtoken");

const SECRET_KEY = "AUTH_SECRET_KEY_123";

const generateToken = (user: any) => {
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" }); // The token expires in 1 hour
  return token;
};
const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

export const authenticatedResolver = (resolverFn: ResolverFn): ResolverFn => {
  return async (parent, args, context: ApolloContext, info) => {
    if (!context.user) {
      throw new GraphQLError("You are not authorized to perform this action.", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }

    return resolverFn(parent, args, context, info);
  };
};

export { generateToken, verifyToken };
