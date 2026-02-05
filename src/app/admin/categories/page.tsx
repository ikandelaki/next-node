import Field from "@/components/Field";
import Form from "@/components/Form";
import { categoryAttributes } from "./_data/categoryAttributes";
import CategoryImageUpload from "@/components/CategoryImageUpload";
import { toKebabCase } from "@/lib/utils/utils";
import { Category } from "@/types/category";
import z from "zod";

export default function CategoryPage() {
  const createCategory = async (formData: FormData) => {
    "use server";

    const data = Object.fromEntries(formData);
    if (!data.urlKey) {
      data.urlKey = toKebabCase(data.name as string);
    }

    console.log(">> data", data);
    try {
      const { name, urlKey, mainImage, description, enabled } =
        await Category.parse(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
      }
    }
    console.log(">> formData", formData);
  };

  const renderMainFormFields = () => {
    return categoryAttributes.map(
      ({ type, id, label, placeholder, isRequired }, key) => (
        <Field
          type={type}
          id={id}
          label={label}
          placeholder={placeholder}
          isRequired={isRequired}
          key={id}
          className={`${key === 0 ? "" : " mt-2"}`}
        />
      ),
    );
  };

  const renderImageUploadSection = () => {
    return (
      <section className="mt-16 flex">
        <CategoryImageUpload />
      </section>
    );
  };

  const renderSaveButton = () => {
    return (
      <button className="Button bg-red-500 ml-auto" form="create-category">
        Save
      </button>
    );
  };

  return (
    <div>
      <section className="Section flex items-center">
        <h1>Categories</h1>
        {renderSaveButton()}
      </section>
      <main className="grid grid-cols-4 w-full h-full gap-x-4 mt-8">
        <section className="Section">Category list</section>
        <section className="Section col-[2/-1]">
          <Form action={createCategory} id="create-category" className="w-full">
            {renderMainFormFields()}
            {renderImageUploadSection()}
          </Form>
        </section>
      </main>
    </div>
  );
}
