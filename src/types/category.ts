import z from "zod";

export const Category = z.object({
  name: z
    .string()
    .trim()
    .max(100, { error: "Name should not be more than 100 characters long." }),
  enabled: z.boolean(),
  urlKey: z.string().trim(),
  mainImage: z.string().trim().max(100, { error: "" }).optional(),
  description: z
    .string()
    .trim()
    .max(300, { error: "Description can not be more than 300 characters long" })
    .optional(),
});
