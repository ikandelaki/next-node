import z from 'zod';

export const Product = z.object({
    enabled: z.string().transform(val => val === '1'),
    name: z.string()
        .trim()
        .max(100, { error: "Name should not be more than 100 characters long" }),
    sku: z.string().trim().max(20, { error: "Sku should not be more than 20 characters long" }),
    price: z.coerce.number("Price should be a valid number").optional().default(0),
    discountPrice: z.coerce.number("Discount price should be a valid number").optional().default(0),
    discountPercentage: z.coerce.number("Discount percentage should be a valid number").optional().default(0),
    quantity: z.coerce.number("Quantity should be a valid number").optional().default(0),
    isInStock: z.string().transform(val => val === '1'),
    media_gallery: z.array(
        z.object({
            url: z.string("Image must have an url"),
            role: z.string()
        })
    ).optional().default([])
})