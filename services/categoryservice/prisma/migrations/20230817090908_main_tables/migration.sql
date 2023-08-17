-- AlterTable
ALTER TABLE "Book" ADD COLUMN "category" TEXT[];

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "books" TEXT[],

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);
