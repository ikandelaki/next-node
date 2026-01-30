'use client';

import { useActionState, useEffect } from "react";
import Form from "@/components/Form";
import { productAttributes } from "../_data/productAttributes";
import Field from "@/components/Field";
import { ERROR_TYPE, SUCCESS_TYPE, useNotificationStore } from "@/store/useNotificationStore";
import { type StateType } from '../create/CreateProductForm';
import { Product } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";

type EditProductFormType = {
    formAction: (
        prevState: StateType,
        formData: FormData
    ) => Promise<StateType>;
    formId: string;
    product: Product;
}

export default function EditProductForm({ formAction, formId, product }: EditProductFormType) {
    const [state, action] = useActionState(formAction, { success: true, message: '' });
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

    return (
        <Form action={ action } id={ formId }>
            { productAttributes.map(({ type, placeholder, label, id, isRequired }, key) => {
                return <Field
                    key={ label }
                    name={ id }
                    id={ id }
                    type={ type }
                    placeholder={ placeholder }
                    defaultValue={ product?.[id] }
                    label={ label }
                    className={ `${ key ? 'mt-2' : '' }` }
                    isRequired={ isRequired }
                />
            }) }
        </Form>
    )
}