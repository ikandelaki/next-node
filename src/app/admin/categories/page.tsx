import CategoryForm from "./_components/CategoryForm";
import { ActionStateType } from "../products/create/CreateProductForm";
import { handleCreateCategory } from "@/lib/utils/category";
import { Suspense } from "react";
import CategoryList from "./_components/CategoryList";

export default function CategoryPage() {
  const createCategory = async (
    initialState: ActionStateType,
    formData: FormData,
  ): Promise<ActionStateType> => {
    "use server";

    return await handleCreateCategory(formData);
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
        <CategoryForm formAction={createCategory} />
      </main>
    </div>
  );
}
