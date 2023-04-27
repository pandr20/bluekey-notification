import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

// Learn more:
// https://pris.ly/d/help/next-js-best-practices

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;

// import { PrismaClient } from "@prisma/client";

// // PrismaClient is attached to the `global` object in development to prevent
// // exhausting your database connection limit.
// //
// // Learn more:
// // https://pris.ly/d/help/next-js-best-practices

// declare global {
//   namespace NodeJS {
//     interface Global {}
//   }
// }

// interface CustomNodeJsGlobal extends NodeJS.Global {
//   prisma: PrismaClient
// }

// declare const global: CustomNodeJsGlobal

// const prisma = global.prisma || new PrismaClient()

// export const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export default prisma;
