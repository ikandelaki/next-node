/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[urlPath]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `urlPath` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `path` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "urlPath" TEXT NOT NULL,
ALTER COLUMN "path" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_path_key" ON "Category"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Category_urlPath_key" ON "Category"("urlPath");
