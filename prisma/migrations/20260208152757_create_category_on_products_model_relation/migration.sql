-- CreateTable
CREATE TABLE "CategoryOnProducts" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoryOnProducts_pkey" PRIMARY KEY ("productId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoryOnProducts" ADD CONSTRAINT "CategoryOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnProducts" ADD CONSTRAINT "CategoryOnProducts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
