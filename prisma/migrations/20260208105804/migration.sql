-- DropIndex
DROP INDEX "Category_path_key";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "path" DROP NOT NULL;
