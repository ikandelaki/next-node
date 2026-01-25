import z from 'zod';

export const Product = z.object({
    enabled: z.stringbool(),
    name: z.string()
        .trim()
        .max(100, { error: "Name should not be more than 100 characters long" }),
    sku: z.string().trim().max(20, { error: "Sku should not be more than 20 characters long" }),
    price: z.coerce.number("Price should be a valid number").optional(),
    discountPrice: z.coerce.number("Discount price should be a valid number").optional(),
    quantity: z.coerce.number("Quantity should be a valid number").optional(),
    isInStock: z.stringbool(),
    images: z.array(z.string()).optional()
})