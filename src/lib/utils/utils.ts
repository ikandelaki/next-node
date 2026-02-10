import { ProductModel } from "@/app/generated/prisma/models";
import z from "zod";

export const toKebabCase = (str: string | null) => {
  if (!str) {
    return "";
  }

  return str
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-") // spaces & underscores → hyphen
    .replace(/[^a-z0-9-]/g, "") // remove invalid chars
    .replace(/-+/g, "-"); // collapse multiple hyphens
};

export const capitalizeFirstLetter = (str: string | null) => {
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformSpaceIntoHyphens = (str?: string) => {
  if (!str) {
    return null;
  }

  return str.trim().replace(/\s+/g, "-");
};

export const getTableColumnData = (model: ProductModel[]) => {
  return Object.keys(model[0]).map((column) => ({
    id: column,
    label: capitalizeFirstLetter(column),
  }));
};

export const formatZodError = (error: z.ZodError) => {
  return error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
};

export const formatPrice = (price: string | number) => {
  if (!price) {
    return null;
  }

  if (typeof price === "number") {
    return `$${String(price)}`;
  }

  return price.includes("$") ? price : `$${price}`;
};

export const calculateDiscountPercentage = (price: number | string, discountPrice: number | string) => {
  return `${Math.ceil(((Number(price) - Number(discountPrice)) / Number(price)) * 100)}% OFF`;
};
