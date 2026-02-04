import Field from "@/components/Field";
import Form from "@/components/Form";
import { categoryAttributes } from "./_data/categoryAttributes";
import ImageUpload from "@/components/ImageUpload";
import { ChangeEvent } from "react";
import CategoryImageUpload from "@/components/CategoryImageUpload";

export default function CategoryPage() {
  const createCategory = async (formData: FormData) => {
    "use server";

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
          <Form action={createCategory} id="create-category">
            {renderMainFormFields()}
            {renderImageUploadSection()}
          </Form>
        </section>
      </main>
    </div>
  );
}
