export const productAttributes = [
    {
        type: 'bool',
        placeholder: 'is Enabled',
        label: 'Is Enabled',
        id: 'enabled',
        isRequired: true
    },
    {
        type: 'text',
        placeholder: 'Name',
        label: 'Product name',
        id: 'name',
        isRequired: true
    },
    {
        type: 'text',
        placeholder: 'SKU',
        label: 'SKU',
        id: 'sku',
        isRequired: true
    },
    {
        type: 'text',
        placeholder: 'Price',
        label: 'Price',
        id: 'price',
        isRequired: false
    },
    {
        type: 'text',
        placeholder: 'Discount price',
        label: 'Discount price',
        id: 'discountPrice',
        isRequired: false
    },
    {
        type: 'text',
        placeholder: 'Quantity',
        label: 'quantity',
        id: 'quantity',
        isRequired: false
    },
    {
        type: 'bool',
        placeholder: 'Is in stock',
        label: 'Is in stock',
        id: 'isInStock',
        isRequired: true
    }
];