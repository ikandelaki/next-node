import { Category } from "@/types/category";
import { formatZodError, toKebabCase } from "./utils";
import prisma from "../prisma";
import z from "zod";

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

    console.log(">> parentId", parentId);
    const { id } = await prisma.category.create({
      data: {
        name,
        urlKey,
        mainImage,
        description,
        enabled,
        // Only include parentId when it was successfully parsed as a positive integer.
        ...(parentId ? { parentId } : {}),
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
