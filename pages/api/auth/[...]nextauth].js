import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name of the provider
      name: "Credentials",
      // The credentials object
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      // The authorize function, which takes the credentials object as an argument
      async authorize(credentials) {
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If the user does not exist, return null
        if (!user) {
          return null;
        }

        // Check if the provided password matches the user's password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If the password does not match, return null
        if (!isValidPassword) {
          return null;
        }

        // Return the user object if the credentials are valid
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});