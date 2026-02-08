import { ImageType } from "@/types/product";
import prisma from "../prisma";

export const handleScalarFields = async (productId: string, restChanges: { [key: string]: unknown }) => {
  await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: { ...restChanges },
  });
};

export const handleProductMediaGallery = async (productId: string, newMedia: ImageType[]) => {
  await prisma.image.deleteMany({ where: { parentId: parseInt(productId) } });

  if (newMedia.length) {
    await prisma.image.createMany({
      data: (newMedia as ImageType[]).map((image) => ({
        parentId: parseInt(productId),
        url: image.url,
        role: image.role,
      })),
    });
  }
};

export const handleProductCategories = async (productId: string, newCategories: string[]) => {
  const id = parseInt(productId);

  // Get existing category associations
  const existingCategories = await prisma.categoryOnProducts.findMany({
    where: { productId: id },
    select: { categoryId: true },
  });

  const existingCategoryIds = existingCategories.map((c) => c.categoryId);
  const newCategoryIds = newCategories.map((id: string) => Number(id));

  // Find categories to remove (exist but not in new list)
  const categoriesToRemove = existingCategoryIds.filter((id) => !newCategoryIds.includes(id));

  // Find categories to add (in new list but don't exist)
  const categoriesToAdd = newCategoryIds.filter((id: number) => !existingCategoryIds.includes(id));

  // Delete removed associations
  if (categoriesToRemove.length > 0) {
    await prisma.categoryOnProducts.deleteMany({
      where: {
        productId: id,
        categoryId: { in: categoriesToRemove },
      },
    });
  }

  // Create new associations
  if (categoriesToAdd.length > 0) {
    await prisma.categoryOnProducts.createMany({
      data: categoriesToAdd.map((categoryId: number) => ({
        productId: id,
        categoryId,
      })),
    });
  }
};
