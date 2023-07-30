// __mocks__/prisma-mock/index.ts

import { PrismaClient, Prisma } from "@prisma/client";

// Define the types for the Prisma mock
type PrismaClientMock<T extends Prisma.PrismaClientOptions = {}> = {
  [P in keyof PrismaClient];
};

// Create the Prisma mock instance
const prismaMock: PrismaClientMock = new PrismaClient();

export default prismaMock;
