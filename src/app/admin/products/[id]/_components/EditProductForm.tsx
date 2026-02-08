"use client";

import { useActionState, useEffect } from "react";
import Form from "@/components/Form";
import { ERROR_TYPE, SUCCESS_TYPE, useNotificationStore } from "@/store/useNotificationStore";
import { type ActionStateType } from "../../create/CreateProductForm";
import { Product } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";
import Expandable from "@/components/Expandable";
import ImageUpload from "@/components/ImageUpload";
import { MediaGalleryType } from "@/components/ImageUpload/ImageUpload";
import { FormLoader } from "./FormLoader";
import { AttributeType } from "@/types/general";

type EditProductFormType = {
  formAction: (prevState: ActionStateType, formData: FormData) => Promise<ActionStateType>;
  formId: string;
  product: Product;
  media_gallery?: MediaGalleryType[];
  productAttributes: AttributeType[];
};

export default function EditProductForm({
  formAction,
  formId,
  product,
  media_gallery,
  productAttributes,
}: EditProductFormType) {
  const [state, action] = useActionState(formAction, {
    success: true,
    message: "",
  });
  const setNotifications = useNotificationStore((state) => state.setNotifications);
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
          <ImageUpload isSquare mediaGallery={media_gallery} productId={product.id} />
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
    <Form action={action} id={formId} className="w-max" fields={productAttributes} dataObject={product} isEdit>
      {renderLoader()}
      {renderMediaGallerySection()}
      {renderHiddenSubmitButton()}
    </Form>
  );
}
