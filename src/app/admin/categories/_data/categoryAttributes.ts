import { Category } from "@/app/generated/prisma/client";

const ATTR_ENABLED = "enabled";
const ATTR_NAME = "name";
const ATTR_URL_KEY = "urlKey";
const ATTR_DESCRIPTION = "description";

export const categoryAttributeMap = {
  ATTR_ENABLED,
  ATTR_NAME,
  ATTR_URL_KEY,
  ATTR_DESCRIPTION,
};

type CategoryAttributeType = {
  type: string;
  placeholder?: string;
  label?: string;
  id: keyof Category;
  isRequired?: boolean;
};

export const categoryAttributes: CategoryAttributeType[] = [
  {
    type: "bool",
    placeholder: "is Enabled",
    label: "Is Enabled",
    id: ATTR_ENABLED,
    isRequired: true,
  },
  {
    type: "text",
    placeholder: "Name",
    label: "Category name",
    id: ATTR_NAME,
    isRequired: true,
  },
  {
    type: "text",
    placeholder: "Url key",
    label: "Url key",
    id: ATTR_URL_KEY,
    isRequired: false,
  },
  {
    type: "textarea",
    placeholder: "Description",
    label: "Description",
    id: ATTR_DESCRIPTION,
    isRequired: false,
  },
];
