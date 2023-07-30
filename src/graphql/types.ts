// graphql/types.ts

import { User } from "@prisma/client";
import { Request, Response } from "express";

export interface ApolloContext {
  req: Request;
  res: Response;
  user?: User | null;
}

export type ResolverFn = (
  parent: any,
  args: any,
  context: ApolloContext,
  info: any
) => any;

export interface Resolver {
  [key: string]: ResolverFn;
}
