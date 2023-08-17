import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Gets All Categories
 * @returns The Data or an error
 */
export const getAll = async () => {
    try {
        const res = await prisma.category.findMany();
        return res;
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        await prisma.$disconnect();
    }
}
/**
 * The Prisma function to add new category
 * @param name the name
 * @param info the info
 * @returns 
 */
export const addNewCategory = async (name: string, info: string) => {
    try {
        const res = await prisma.category.create({
            data: {
                name: name,
                info:info
            },
        });
        return res;
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        await prisma.$disconnect();
    }

}