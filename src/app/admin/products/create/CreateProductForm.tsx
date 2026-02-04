"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import Form from "@/components/Form";
import Field from "@/components/Field";
import Expandable from "@/components/Expandable";
import ImageUpload from "@/components/ImageUpload";
import {
  useNotificationStore,
  ERROR_TYPE,
  SUCCESS_TYPE,
} from "@/store/useNotificationStore";
import { productAttributes } from "../_data/productAttributes";
import { useRouter } from "next/navigation";

export type StateType = {
  success: boolean;
  message: string;
};

interface CreateProductFormProps {
  action: (prevState: StateType, formData: FormData) => Promise<StateType>;
}

export default function CreateProductForm({ action }: CreateProductFormProps) {
  const [state, formAction] = useActionState(action, {
    success: false,
    message: "",
  });
  const { setNotifications } = useNotificationStore();
  const router = useRouter();

  useEffect(() => {
    const { success, message } = state;

    const type = success ? SUCCESS_TYPE : ERROR_TYPE;

    if (!message) {
      return;
    }

    setNotifications({ type, message });
    router.push(`/admin/products`);
  }, [state, setNotifications, router]);

  const renderMainFormFields = () => {
    return productAttributes.map(
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

  const renderMediaGallerySection = () => {
    return (
      <section className="mt-16">
        <Expandable title="Media gallery" shouldRenderBottomLine={true}>
          <ImageUpload isSquare />
        </Expandable>
      </section>
    );
  };

  const renderSaveButton = () => {
    return (
      <button className="Button bg-red-500 ml-auto" form="create-product">
        Save
      </button>
    );
  };

  return (
    <div>
      <section className="Section flex items-center">
        <h1>Create a product</h1>
        {renderSaveButton()}
      </section>
      <div className="Section mt-4">
        <h2>Product details</h2>
        <Form action={formAction} id="create-product" className="w-max">
          {renderMainFormFields()}
          {renderMediaGallerySection()}
        </Form>
      </div>
    </div>
  );
}
