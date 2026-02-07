import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ImageType, Product } from "@/types/product";
import z from "zod";
import { formatZodError } from "@/lib/utils/utils";
import EditProductForm from "./_components/EditProductForm";
import { type ActionStateType } from "../create/CreateProductForm";
import { getChangedFields } from "@/lib/utils/compare";

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

    const data = Object.fromEntries(formData.entries());
    const rawFormData = {
      ...data,
      media_gallery: raw_media_gallery,
    };

    try {
      const parsedProduct = await Product.parse(rawFormData);

      const changes = getChangedFields(parsedProduct, product);

      if (Object.keys(changes).length === 0) {
        return { success: true, message: "Product saved successfully" };
      }

      const { media_gallery: newMedia, ...restChanges } = changes;

      if (Object.keys(restChanges).length > 0) {
        await prisma.product.update({
          where: {
            id: parseInt(id),
          },
          data: { ...restChanges },
        });
      }

      if (newMedia?.length) {
        await prisma.image.deleteMany({ where: { parentId: parseInt(id) } });

        if (newMedia.length) {
          await prisma.image.createMany({
            data: (newMedia as ImageType[]).map((image) => ({
              parentId: parseInt(id),
              url: image.url,
              role: image.role,
            })),
          });
        }
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
    return <EditProductForm formAction={formAction} product={product} formId={formId} media_gallery={media_gallery} />;
  };

  return (
    <section className="relative">
      {renderHeading()}
      <div>{renderMainForm()}</div>
    </section>
  );
}
