import { Product } from '@/app/admin/products/_types/produtType';
import z from 'zod';
import CreateProductForm from './CreateProductForm';
import prisma from '@/lib/prisma';

export default function CreateProduct() {
    const createProduct = async (
        prevState: { success: boolean; error?: string, message?: string },
        formData: FormData
    ) => {
        "use server";

        try {
            const raw_media_gallery = formData
                .getAll('image')
                .map((image) => ({ url: image, role: "" })) || [];
            const data = Object.fromEntries(formData.entries());
            const rawFormData = {
                ...data,
                media_gallery: raw_media_gallery
            }
            
            const {
                name,
                sku,
                enabled,
                price,
                discountPrice,
                discountPercentage,
                quantity,
                isInStock,
                media_gallery
            } = Product.parse(rawFormData);

            await prisma.product.create({
                data: {
                    name,
                    sku,
                    enabled,
                    price,
                    discountPrice,
                    discountPercentage,
                    quantity,
                    isInStock,
                    media_gallery: {
                        create: media_gallery
                    }
                },
                include: {
                    media_gallery: true
                }
            })

            // Here you would save to database or something
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    success: false,
                    error: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ')
                };
            }

            console.log('>> error', error);
            return { success: false, error: 'Unknown error' };
        }
    }

    return <CreateProductForm action={createProduct} />;
}