import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import type { Adapter } from "next-auth/adapters"
import type { AuthOptions } from "next-auth";

const adapter: Adapter = PrismaAdapter(prisma);

export const authOptions: AuthOptions = {
  adapter: adapter,
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/sign-in"
  }
};
