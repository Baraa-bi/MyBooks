import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server-express";

import prisma from "../../db/prisma";
import { validateRegistrationInput } from "../../validators/registration-validator";
import { validateLoginInput } from "../../validators/login-validator";
import { generateToken } from "../../utils/auth";

interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

interface LoginInput {
  username: string;
  password: string;
}

export default {
  Mutation: {
    register: async (_: any, { user }: { user: RegisterInput }) => {
      try {
        await validateRegistrationInput(user);
      } catch (errors: any) {
        throw new Error(errors.errors.join("\n"));
      }

      const { email, username, password } = user;

      // Check if the email or username already exists
      const existingUser = await prisma.user
        .findFirst({
          where: { OR: [{ email }, { username }] },
        })
        .catch((e) => console.log(e));

      if (existingUser) {
        throw new Error("Email or username already exists");
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 12);

      // Save the user to the database using Prisma
      const newUser = await prisma.user.create({
        data: { email, username, password: hashedPassword },
      });

      // Generate authentication token
      const token = generateToken(newUser);

      // Return the authentication token and the user object in the response
      return { token, user: newUser };
    },
    login: async (_: any, { username, password }: LoginInput) => {
      try {
        await validateLoginInput({ username, password });
      } catch (errors: any) {
        throw new Error(errors.errors.join("\n"));
      }

      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new AuthenticationError("Invalid password");
      }

      const token = generateToken(user);

      return { token, user };
    },
  },
};
