/*
  Warnings:

  - A unique constraint covering the columns `[urlKey]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_urlKey_key" ON "Product"("urlKey");
