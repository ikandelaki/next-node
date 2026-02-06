"use client";

import { useActionState, useEffect } from "react";
import Form from "@/components/Form";
import { productAttributes } from "../../_data/productAttributes";
import Field from "@/components/Field";
import {
  ERROR_TYPE,
  SUCCESS_TYPE,
  useNotificationStore,
} from "@/store/useNotificationStore";
import { type ActionStateType } from "../../create/CreateProductForm";
import { Product } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";
import Expandable from "@/components/Expandable";
import ImageUpload from "@/components/ImageUpload";
import { MediaGalleryType } from "@/components/ImageUpload/ImageUpload";
import { FormLoader } from "./FormLoader";

type EditProductFormType = {
  formAction: (
    prevState: ActionStateType,
    formData: FormData,
  ) => Promise<ActionStateType>;
  formId: string;
  product: Product;
  media_gallery?: MediaGalleryType[];
};

export default function EditProductForm({
  formAction,
  formId,
  product,
  media_gallery,
}: EditProductFormType) {
  const [state, action] = useActionState(formAction, {
    success: true,
    message: "",
  });
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );
  const router = useRouter();

  useEffect(() => {
    const { success, message } = state;

    if (!message) {
      return;
    }

    const type = success ? SUCCESS_TYPE : ERROR_TYPE;

    if (success) {
      setNotifications({ type, message });
      router.refresh();
      return;
    }

    setNotifications({ type, message });
  }, [state, setNotifications, router]);

  const renderMediaGallerySection = () => {
    return (
      <section className="mt-16">
        <Expandable title="Media gallery" shouldRenderBottomLine={true}>
          <ImageUpload
            isSquare
            mediaGallery={media_gallery}
            productId={product.id}
          />
        </Expandable>
      </section>
    );
  };

  const renderLoader = () => {
    return <FormLoader />;
  };

  const renderHiddenSubmitButton = () => {
    return <button type="submit" hidden />;
  };

  return (
    <Form action={action} id={formId} className="w-max">
      {productAttributes.map(
        ({ type, placeholder, label, id, isRequired }, key) => {
          return (
            <Field
              key={label}
              name={id}
              id={id}
              type={type}
              placeholder={placeholder}
              defaultValue={String(product?.[id])}
              label={label}
              className={`${key ? "mt-2" : ""}`}
              isRequired={isRequired}
            />
          );
        },
      )}
      {renderLoader()}
      {renderMediaGallerySection()}
      {renderHiddenSubmitButton()}
    </Form>
  );
}
