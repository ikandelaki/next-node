import { Product } from '@/app/admin/products/_types/produtType';
import z from 'zod';
import CreateProductForm from './CreateProductForm';

export default function CreateProduct() {
    const createProduct = async (
        prevState: { success: boolean; error?: string },
        formData: FormData
    ) => {
        "use server";

        try {
            const images = formData.getAll('image') || [];
            const data = Object.fromEntries(formData.entries());
            const rawFormData = {
                ...data,
                images
            }
            
            Product.parse(rawFormData);
            // Here you would save to database or something
            return { success: true };
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    success: false,
                    error: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ')
                };
            }
            return { success: false, error: 'Unknown error' };
        }
    }

    return <CreateProductForm action={createProduct} />;
}