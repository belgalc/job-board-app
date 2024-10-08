import { PrismaClient } from "@prisma/client";
import { env } from "process";

declare global {
  namespace NodeJS {
    interface Global { }
  }
}

// //add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// //Prevent multiple instances of Prisma Client in development

declare const global: CustomNodeJsGlobal;

const prisma = (() => {
  if (typeof window !== "undefined") {
    return {} as unknown as PrismaClient;
  }
  return (
    global.prisma ??
    new PrismaClient({
      log:
        env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })
  );
})();

export default prisma;

