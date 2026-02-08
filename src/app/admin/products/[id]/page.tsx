import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ImageType, Product } from "@/types/product";
import z from "zod";
import { formatZodError } from "@/lib/utils/utils";
import EditProductForm from "./_components/EditProductForm";
import { type ActionStateType } from "../create/CreateProductForm";
import { getChangedFields } from "@/lib/utils/compare";
import { productAttributes } from "../_data/productAttributes";
import { handleProductCategories, handleProductMediaGallery, handleScalarFields } from "@/lib/utils/product";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { media_gallery: true },
  });

  if (!product) {
    return notFound();
  }

  const formId = `editProduct-${product.id}`;
  const { media_gallery } = product;
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const formAction = async (prevState: ActionStateType, formData: FormData) => {
    "use server";

    // Need to re-fetch the product,
    // because the image data may have changed after first fetching it when the product page loaded
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { media_gallery: true },
    });

    if (!product) {
      return notFound();
    }

    const raw_media_gallery = formData.getAll("image").map((image) => ({ url: image, role: "" })) || [];
    const categories = formData.getAll("categories");

    const data = Object.fromEntries(formData.entries());
    const rawFormData = {
      ...data,
      categories,
      media_gallery: raw_media_gallery,
    };

    try {
      const parsedProduct = await Product.parse(rawFormData);

      const changes = getChangedFields(parsedProduct, product);

      if (Object.keys(changes).length === 0) {
        return { success: true, message: "Product saved successfully" };
      }

      const { media_gallery: newMedia, categories: newCategories, ...restChanges } = changes;

      if (Object.keys(restChanges).length > 0) {
        await handleScalarFields(id, restChanges);
      }

      if (newMedia?.length) {
        await handleProductMediaGallery(id, newMedia);
      }

      if (newCategories?.length) {
        await handleProductCategories(id, newCategories);
      }

      return { success: true, message: "Product saved successfully" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: formatZodError(error),
        };
      }

      return { success: false, message: "Unknown error while editing product" };
    }
  };

  const renderSaveButton = () => {
    return (
      <button type="submit" className="Button bg-red-500" form={formId}>
        Save
      </button>
    );
  };

  const renderHeading = () => {
    return (
      <div className="Section flex items-center">
        <h1>
          Edit product <b>{product.name}</b>
        </h1>
        <div className="ml-auto">{renderSaveButton()}</div>
      </div>
    );
  };

  const renderMainForm = () => {
    const parsedProductAttributes = productAttributes.map((attr) => {
      if (attr.id !== "categories") {
        return attr;
      }

      return {
        ...attr,
        options: categories,
      };
    });
    return (
      <EditProductForm
        formAction={formAction}
        product={product}
        formId={formId}
        media_gallery={media_gallery}
        productAttributes={parsedProductAttributes}
      />
    );
  };

  return (
    <section className="relative">
      {renderHeading()}
      <div>{renderMainForm()}</div>
    </section>
  );
}
