import { formatZodError, toKebabCase } from "@/lib/utils/utils";
import { Category } from "@/types/category";
import z from "zod";
import CategoryForm from "./_components/CategoryForm";
import { ActionStateType } from "../products/create/CreateProductForm";
import prisma from "@/lib/prisma";

export default function CategoryPage() {
  const createCategory = async (
    initialState: ActionStateType,
    formData: FormData,
  ): Promise<ActionStateType> => {
    "use server";

    const data = Object.fromEntries(formData);
    if (!data.urlKey) {
      data.urlKey = toKebabCase(data.name as string);
    }

    try {
      const {
        name,
        urlKey,
        mainImage = "",
        description = "",
        enabled,
      } = await Category.parse(data);

      const { id } = await prisma.category.create({
        data: {
          name,
          urlKey,
          mainImage,
          description,
          enabled,
        },
      });

      return {
        success: true,
        message: "Category created successfully",
        redirectPath: `/admin/categories/${id}`,
      };
    } catch (err) {
      if (err instanceof z.ZodError) {
        return {
          success: false,
          message: formatZodError(err),
        };
      }

      return {
        success: false,
        message: "Could not create the category",
      };
    }
  };

  return <CategoryForm formAction={createCategory} />;
}
