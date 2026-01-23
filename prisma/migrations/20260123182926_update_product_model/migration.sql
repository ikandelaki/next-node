/*
  Warnings:

  - You are about to drop the column `discount_percentage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount_price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `discountPercentage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enabled` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isInStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount_percentage",
DROP COLUMN "discount_price",
ADD COLUMN     "discountPercentage" INTEGER NOT NULL,
ADD COLUMN     "discountPrice" INTEGER NOT NULL,
ADD COLUMN     "enabled" BOOLEAN NOT NULL,
ADD COLUMN     "isInStock" BOOLEAN NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
