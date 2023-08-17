import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
    try{
        const res = await prisma.category.findMany();
        return res;
    }
    catch(e){
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally{
        await prisma.$disconnect();
    }
}