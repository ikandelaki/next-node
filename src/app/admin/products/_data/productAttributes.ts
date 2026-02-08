import { AttributeType } from "@/types/general";

const ATTR_ENABLED = "enabled";
const ATTR_NAME = "name";
const ATTR_SKU = "sku";
const ATTR_PRICE = "price";
const ATTR_DISCOUNT_PRICE = "discountPrice";
const ATTR_QUANTITY = "quantity";
const ATTR_IS_IN_STOCK = "isInStock";
const ATTR_MEDIA_GALLERY = "media_gallery";
const ATTR_CATEGORIES = "categories";

export const productAttributeMap = {
  ATTR_ENABLED,
  ATTR_NAME,
  ATTR_SKU,
  ATTR_PRICE,
  ATTR_DISCOUNT_PRICE,
  ATTR_QUANTITY,
  ATTR_IS_IN_STOCK,
  ATTR_MEDIA_GALLERY,
  ATTR_CATEGORIES,
};

export const productAttributes: AttributeType[] = [
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
    label: "Product name",
    id: ATTR_NAME,
    isRequired: true,
  },
  {
    type: "text",
    placeholder: "SKU",
    label: "SKU",
    id: ATTR_SKU,
    isRequired: true,
  },
  {
    type: "text",
    placeholder: "Price",
    label: "Price",
    id: ATTR_PRICE,
    isRequired: false,
  },
  {
    type: "text",
    placeholder: "Discount price",
    label: "Discount price",
    id: ATTR_DISCOUNT_PRICE,
    isRequired: false,
  },
  {
    type: "text",
    placeholder: "Quantity",
    label: "quantity",
    id: ATTR_QUANTITY,
    isRequired: false,
  },
  {
    type: "bool",
    placeholder: "Is in stock",
    label: "Is in stock",
    id: ATTR_IS_IN_STOCK,
    isRequired: true,
  },
  {
    type: "multiselect",
    placeholder: "Is in stock",
    label: "Categories",
    id: ATTR_CATEGORIES,
    isRequired: true,
    options: [],
  },
];
