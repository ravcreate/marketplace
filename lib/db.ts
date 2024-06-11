/**
 *  This instantiates a single instance PrismaClient and save it on the globalThis object.
 *	Solves the issue:  Next.js hot reloading that instantiates a new Prisma Client that creates a connection to the database.
 */
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
