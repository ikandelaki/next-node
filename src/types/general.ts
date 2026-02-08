import { Category, Product } from "@/app/generated/prisma/client";

type ProductAttributeId = keyof Product | keyof Category | "categories";

export type OptionType = {
  id: number;
  name: string;
  isSelected?: boolean;
};

export type AttributeType = {
  type: string;
  placeholder?: string;
  label?: string;
  id: ProductAttributeId;
  isRequired?: boolean;
  options?: OptionType[];
};
