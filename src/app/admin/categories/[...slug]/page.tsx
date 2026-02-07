import { lazy, Suspense } from "react";
import prisma from "@/lib/prisma";
import { ActionStateType } from "../../products/create/CreateProductForm";
import CategoryForm from "../_components/CategoryForm";
import { notFound } from "next/navigation";
import { handleCreateCategory, handleEditCategory } from "@/lib/utils/category";
import Link from "next/link";

const CategoryList = lazy(() => import("../_components/CategoryList"));

type CreateCategoryPageType = {
  params: Promise<{ slug: string[] }>;
};

export default async function CreateCategoryPage({ params }: CreateCategoryPageType) {
  const { slug = [] } = await params;
  const lastCategoryPath = slug[slug?.length - 1];
  const isEditForm = lastCategoryPath !== "create";

  if (!lastCategoryPath) {
    return notFound();
  }

  // Only fetch the category if we are on the edit category page
  // So basically:
  // -- if the current path ends with /create slug, then we are on create category page
  // -- if it ends with 2, 6, etc. then we are on edit category page.
  const category =
    isEditForm &&
    (await prisma.category.findUnique({
      where: {
        id: parseInt(lastCategoryPath),
      },
    }));

  console.log(">> category", category);
  // If we are on edit category page and category was not found
  if (isEditForm && !category) {
    return notFound();
  }

  const formAction = async (initialState: ActionStateType, formData: FormData) => {
    "use server";

    console.log(">> formData", formData);
    if (!isEditForm) {
      return await handleCreateCategory(formData, slug.slice(0, -1));
    }

    return handleEditCategory(formData, slug);
  };

  const renderSaveButton = () => {
    return (
      <button className="Button bg-red-500" form="create-category">
        Save
      </button>
    );
  };

  const renderCreateCategoryButton = () => {
    if (!isEditForm) {
      return null;
    }

    const redirectPath = `/admin/categories/${slug.join("/")}/create`;

    return (
      <Link href={redirectPath} className="Button">
        Create a category
      </Link>
    );
  };

  const renderActionButtons = () => {
    return (
      <div className="ml-auto flex items-center gap-8">
        {renderCreateCategoryButton()}
        {renderSaveButton()}
      </div>
    );
  };

  const renderCategoryListFallback = () => {
    return <section className="Section">Category list</section>;
  };

  return (
    <div>
      <section className="Section flex items-center">
        <h1>Categories</h1>
        {renderActionButtons()}
      </section>
      <main className="grid grid-cols-4 w-full h-full gap-x-4 mt-8">
        <Suspense fallback={renderCategoryListFallback()}>
          <CategoryList />
        </Suspense>
        <CategoryForm
          formAction={formAction}
          isEdit={isEditForm}
          dataObject={isEditForm && category ? category : null}
        />
      </main>
    </div>
  );
}
