import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Gets All Categories
 * @returns The Data or an error
 */
export const getAll = async () => {
    await prisma.$connect();
    console.log("DB Connection opened --> getAll");
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
        console.log("Db Connection closed");
    }
}
/**
 * The Prisma function to add new category
 * @param name the name
 * @param info the info
 * @returns 
 */
export const addNewCategory = async (name: string, info: string) => {
    await prisma.$connect();
    console.log("DB Connection opened --> addNewCategory");
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
        console.log("DB Connection closed --> addNewCategory");
        await prisma.$disconnect();
    }

}
/**
 * Prisma Function to Check whether the category exists
 * @param name 
 * @param info 
 * @returns 
 */
export const checkCategoryAlreadyExists = async (name:string) => {
    await prisma.$connect();
    console.log("DB Connection opened --> checkCategoryExists");
    try {
        const res = await prisma.category.findFirst({
            where: {
                name: name
            },
        });
        return res;
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        console.log("DB Connection closed --> checkCategoryExists");
        await prisma.$disconnect();
    }
}

/**
 * Prisma Function to Check whether the category exists
 * @param name 
 * @param info 
 * @returns 
 */
export const checkCategoryAlreadyExistsByID = async (id:number) => {
    try {
        const res = await prisma.category.findFirst({
            where: {
                id: id
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

/**
 * Prisma Function for deleting category 
 * @param id the specific id
 * @returns 
 */
export const deleteCategory = async (id: number) => {
    try {
        const res = await prisma.category.delete({
            where: {
                id: id
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
};

/**
 * Prisma Function to Update category
 * @param id The ID parameter
 * @param requestBody The Body Parameters
 */
export const updateCategory =async (id:number,requestBody:{name:string,info:string}) => {
    try{
        const {name,info} = requestBody;
        const res = await prisma.category.update({
            where : {
                id:id
            } ,
            data : {
                name: name,
                info: info
            }
        })
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