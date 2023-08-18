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
/**
 * Prisma Function to Check whether the category exists
 * @param name 
 * @param info 
 * @returns 
 */
export const checkCategoryAlreadyExists = async (name:string) => {
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
 * @param id 
 * @param requestBody 
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