import { GraphQLError } from "graphql";
import { verifyToken } from "../utils/auth";
import { ApolloContext } from "../graphql/types";

const authMiddleware = async (context: ApolloContext) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = verifyToken(token);
        context.user = user;
      } catch (err) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }
    } else {
      throw new Error("Authentication token must be provided");
    }
  }

  return context;
};

export default authMiddleware;
