/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT[],
    "entered" TIMESTAMP(3) NOT NULL,
    "status" "BookStatus" NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
