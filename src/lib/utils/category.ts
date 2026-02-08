import { Category } from "@/types/category";
import { formatZodError, toKebabCase } from "./utils";
import prisma from "../prisma";
import z from "zod";
import { getChangedFields } from "./compare";

export const handleCreateCategory = async (formData: FormData, categoryPath?: string[]) => {
  const data = Object.fromEntries(formData);
  if (!data.urlKey) {
    data.urlKey = toKebabCase(data.name as string);
  }

  try {
    const { name, urlKey, mainImage = "", description = "", enabled } = await Category.parse(data);

    // Safely derive parentId from the provided categoryPath.
    // The last segment may include extra slashes or be non-numeric, so parse cautiously.
    let parentId: number | undefined = undefined;
    if (categoryPath?.length) {
      const lastRaw = String(categoryPath[categoryPath.length - 1]);
      const lastSegment = lastRaw.split("/").filter(Boolean).pop();
      const parsed = lastSegment ? parseInt(lastSegment, 10) : NaN;
      if (Number.isInteger(parsed) && parsed > 0) {
        parentId = parsed;
      }
    }

    const parentCategory =
      parentId && (await prisma.category.findUnique({ where: { id: parentId }, select: { urlPath: true } }));
    const urlPath = parentCategory ? `${parentCategory.urlPath}/${urlKey}` : urlKey;

    const { id } = await prisma.category.create({
      data: {
        name,
        urlKey,
        mainImage,
        description,
        enabled,
        urlPath,
        parentId,
      },
    });

    const newFullCategoryPath = categoryPath && categoryPath.length ? `${categoryPath.join("/")}/${id}` : String(id);
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        path: newFullCategoryPath,
      },
    });

    return {
      success: true,
      message: "Category created successfully",
      redirectPath: `/admin/categories/${newFullCategoryPath}`,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        message: formatZodError(err),
      };
    }

    console.error(err);
    return {
      success: false,
      message: "Could not create the category",
    };
  }
};

export const handleEditCategory = async (formData: FormData, categoryPath: string[]) => {
  const id = categoryPath[categoryPath.length - 1];
  const data = Object.fromEntries(formData);
  if (!data.urlKey) {
    data.urlKey = toKebabCase(data.name as string);
  }

  try {
    const parsedCategory = await Category.parse(data);
    const prevCategory = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!prevCategory) {
      throw new Error(`Category with id ${id} does not exist`);
    }

    const changes = getChangedFields(parsedCategory, prevCategory);

    if (!Object.keys(changes)?.length) {
      return {
        success: true,
        message: "Category updated successfully",
        redirectPath: `/admin/categories/${prevCategory.path}`,
      };
    }

    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: { ...changes },
    });

    return {
      success: true,
      message: "Category updated successfully",
      redirectPath: `/admin/categories/${category.path}`,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        message: formatZodError(err),
      };
    }

    if (typeof err === "string") {
      return {
        success: false,
        message: err,
      };
    }

    return {
      success: false,
      message: "Could not create the category",
    };
  }
};
