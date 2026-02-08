import { Product } from "@/types/product";
import z from "zod";
import CreateProductForm, { type ActionStateType } from "./CreateProductForm";
import prisma from "@/lib/prisma";
import { formatZodError } from "@/lib/utils/utils";
import { handleProductCategories } from "@/lib/utils/product";
import { productAttributes } from "../_data/productAttributes";

export default async function CreateProduct() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const getParsedProductAttributes = () => {
    return productAttributes.map((attr) => {
      if (attr.id !== "categories") {
        return attr;
      }

      return {
        ...attr,
        options: categories.map((category) => ({
          ...category,
          isSelected: false,
        })),
      };
    });
  };

  const createProduct = async (prevState: ActionStateType, formData: FormData) => {
    "use server";

    try {
      const raw_media_gallery =
        formData
          .getAll("image")
          .filter(Boolean)
          .map((image) => ({ url: image, role: "" })) || [];
      const categories = formData.getAll("categories").map((categoryId) => String(categoryId));
      const data = Object.fromEntries(formData.entries());
      const rawFormData = {
        ...data,
        categories,
        media_gallery: raw_media_gallery,
      };

      const { name, sku, enabled, price, discountPrice, discountPercentage, quantity, isInStock, media_gallery } =
        Product.parse(rawFormData);

      const { id } = await prisma.product.create({
        data: {
          name,
          sku,
          enabled,
          price,
          discountPrice,
          discountPercentage,
          quantity,
          isInStock,
          media_gallery: {
            create: media_gallery,
          },
        },
        include: {
          media_gallery: true,
        },
      });

      console.log(">> categories!@", categories);
      await handleProductCategories(id, categories);

      return {
        success: true,
        message: "Product created successfully",
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: formatZodError(error),
        };
      }

      return {
        success: false,
        message: "Unknown error while creating product",
      };
    }
  };

  return <CreateProductForm action={createProduct} productAttributes={getParsedProductAttributes()} />;
}
