"use client";

import CategoryImageUpload from "@/components/CategoryImageUpload";
import Field from "@/components/Field";
import Form from "@/components/Form";
import { categoryAttributes } from "../_data/categoryAttributes";
import { useActionState, useEffect, useEffectEvent } from "react";
import { ActionStateType } from "../../products/create/CreateProductForm";
import {
  ERROR_TYPE,
  SUCCESS_TYPE,
  useNotificationStore,
} from "@/store/useNotificationStore";
import { useRouter } from "next/navigation";
import { Category } from "@/app/generated/prisma/client";

type CategoryFormType = {
  formAction: (
    initialState: ActionStateType,
    formData: FormData,
  ) => Promise<ActionStateType>;
  isEdit?: boolean;
  dataObject?: Category;
};

export default function CategoryForm({
  formAction,
  isEdit,
  dataObject,
}: CategoryFormType) {
  const [state, action] = useActionState(formAction, {
    success: true,
    message: "",
  });
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );
  const router = useRouter();

  const onFormSubmit = useEffectEvent(() => {
    const { success, message, redirectPath } = state;

    setNotifications({
      type: success ? SUCCESS_TYPE : ERROR_TYPE,
      message: message,
    });

    if (redirectPath) {
      router.push(redirectPath);
    }
  });

  useEffect(() => {
    if (state.message) {
      onFormSubmit();
    }
  }, [state.message]);

  const renderMainFormFields = () => {
    return categoryAttributes.map(
      ({ type, id, label, placeholder, isRequired }, key) => (
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

  return (
    <section className="Section col-[2/-1]">
      <Form action={action} id="create-category" className="w-full">
        {renderMainFormFields()}
        {renderImageUploadSection()}
      </Form>
    </section>
  );
}
