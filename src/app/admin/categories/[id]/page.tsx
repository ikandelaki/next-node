import { lazy, Suspense } from "react";
import prisma from "@/lib/prisma";
import { ActionStateType } from "../../products/create/CreateProductForm";
import CategoryForm from "../_components/CategoryForm";
import { notFound } from "next/navigation";

const CategoryList = lazy(() => import("../_components/CategoryList"));

type CreateCategoryPageType = {
  params: Promise<{ id: string }>;
};

export default async function CreateCategoryPage({
  params,
}: CreateCategoryPageType) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!category) {
    return notFound();
  }

  const formAction = async (
    initialState: ActionStateType,
    formData: FormData,
  ) => {
    "use server";
    console.log(">> formData", formData);
    return new Promise<ActionStateType>((resolve) => {
      resolve({ success: true, message: "" });
    });
  };

  const renderSaveButton = () => {
    return (
      <button className="Button bg-red-500 ml-auto" form="create-category">
        Save
      </button>
    );
  };

  const renderCategoryListFallback = () => {
    return <section className="Section">Category list</section>;
  };

  return (
    <div>
      <section className="Section flex items-center">
        <h1>Categories</h1>
        {renderSaveButton()}
      </section>
      <main className="grid grid-cols-4 w-full h-full gap-x-4 mt-8">
        <Suspense fallback={renderCategoryListFallback()}>
          <CategoryList />
        </Suspense>
        <CategoryForm formAction={formAction} isEdit dataObject={category} />
      </main>
    </div>
  );
}
