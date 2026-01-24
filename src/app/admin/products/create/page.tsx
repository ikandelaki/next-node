import Form from "@/components/Form";
import Field from "@/components/Field";

export default function CreateProduct() {
    const productAttributes = [
        {
            type: 'bool',
            placeholder: 'is Enabled',
            label: 'Is Enabled',
            id: 'enabled',
            isRequired: false
        },
        {
            type: 'text',
            placeholder: 'Name',
            label: 'Product name',
            id: 'product-name',
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
            id: 'discount-price',
            isRequired: false
        },
        {
            type: 'text',
            placeholder: 'Discount percentage',
            label: 'Discount percentage',
            id: 'discount-percentage',
            isRequired: false
        },
        {
            type: 'text',
            placeholder: 'image',
            label: 'Image',
            id: 'image',
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
            type: 'text',
            placeholder: 'Is in stock',
            label: 'Is in stock',
            id: 'is-in-stock',
            isRequired: false
        }
    ]

    const createProduct = async (formData: FormData) => {
        "use server";
        console.log('>> formData', formData);
    }

    const renderFormFields = () => {
        return productAttributes.map(({ type, id, label, placeholder, isRequired }, key) => (
            <Field
                type={ type }
                id={ id }
                label={ label }
                placeholder={ placeholder }
                isRequired={ isRequired }
                key={ id }
                className={ `${key === 0 ? '' : ' mt-2'}` }
            />
        ))
    }

    return (
        <div>
            <section className="Section">
                <h1>Create a product</h1>
            </section>
            <div className="Section mt-4">
                <h2>Product details</h2>
                <Form action={ createProduct }>
                    { renderFormFields() }
                </Form>
            </div>
        </div>
    )
}