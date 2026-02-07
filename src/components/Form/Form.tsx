import { ProductAttributeType } from "@/app/admin/products/_data/productAttributes";
import Field from "../Field";

import { CategoryAttributeType } from "@/app/admin/categories/_data/categoryAttributes";
import { FormLoader } from "@/app/admin/products/[id]/_components/FormLoader";

type FormType = {
  action: (formData: FormData) => void;
  className?: string;
  children: React.ReactNode;
  id?: string;
  shouldRenderSubmitButton?: boolean;
  fields: CategoryAttributeType[] | ProductAttributeType[];
  isEdit?: boolean;
  dataObject?: { [key: string]: unknown } | null;
};

export default function Form({
  action,
  className,
  children,
  id,
  shouldRenderSubmitButton,
  fields,
  isEdit,
  dataObject,
}: FormType) {
  const renderSubmitButton = () => {
    if (!shouldRenderSubmitButton) {
      return null;
    }

    return (
      <button type="submit" className="Button mt-8">
        Submit
      </button>
    );
  };

  const renderMainFormFields = () => {
    return fields.map(({ type, id, label, placeholder, isRequired }, key) => (
      <Field
        type={type}
        id={id}
        label={label}
        placeholder={placeholder}
        isRequired={isRequired}
        defaultValue={isEdit ? String(dataObject?.[id]) : ""}
        key={id}
        className={`${key === 0 ? "" : " mt-2"}`}
      />
    ));
  };

  const renderLoader = () => {
    return <FormLoader />;
  };

  console.log(">> rendering form", dataObject);
  return (
    <form action={action} className={`Section mt-4 ${className}`} id={id} key={String(id)}>
      {renderMainFormFields()}
      {children}
      {renderLoader()}
      {renderSubmitButton()}
    </form>
  );
}
