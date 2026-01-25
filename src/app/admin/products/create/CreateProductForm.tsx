'use client';

import { useActionState } from 'react';
import { useEffect } from 'react';
import Form from "@/components/Form";
import Field from "@/components/Field";
import Expandable from "@/components/Expandable";
import ImageUpload from "@/components/ImageUpload";
import { useNotificationStore, ERROR_TYPE, SUCCESS_TYPE } from '@/store/useNotificationStore';
import { productAttributes } from '../_data/productAttributes';

interface CreateProductFormProps {
    action: (prevState: { success: boolean; error?: string }, formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export default function CreateProductForm({ action }: CreateProductFormProps) {
    const [state, formAction] = useActionState(action, { success: true });
    const { setNotifications } = useNotificationStore();

    useEffect(() => {
        const { success, error, message } = state;
        if (!success && error) {
            setNotifications({ type: ERROR_TYPE, message: error });
        }

        if (success && message) {
            setNotifications({ type: SUCCESS_TYPE, message });
        }
    }, [state, setNotifications]);

    const renderMainFormFields = () => {
        return productAttributes.map(({ type, id, label, placeholder, isRequired }, key) => (
            <Field
                type={type}
                id={id}
                label={label}
                placeholder={placeholder}
                isRequired={isRequired}
                key={id}
                className={`${key === 0 ? '' : ' mt-2'}`}
            />
        ));
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

    return (
        <div>
            <section className="Section">
                <h1>Create a product</h1>
            </section>
            <div className="Section mt-4">
                <h2>Product details</h2>
                <Form action={formAction}>
                    {renderMainFormFields()}
                    {renderMediaGallerySection()}
                </Form>
            </div>
        </div>
    );
}