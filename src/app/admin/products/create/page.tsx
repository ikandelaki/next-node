import Form from "@/components/Form";
import Field from "@/components/Field";
import Expandable from "@/components/Expandable";
import ImageUpload from "@/components/ImageUpload";

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
            placeholder: 'Quantity',
            label: 'quantity',
            id: 'quantity',
            isRequired: false
        },
        {
            type: 'bool',
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

    const renderMainFormFields = () => {
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

    const renderMediaGallerySection = () => {
        return (
            <section className="mt-16">
                <Expandable title="Media gallery" shouldRenderBottomLine={ true }>
                    <ImageUpload />
                </Expandable>
            </section>
        )
    }

    return (
        <div>
            <section className="Section">
                <h1>Create a product</h1>
            </section>
            <div className="Section mt-4">
                <h2>Product details</h2>
                <Form action={ createProduct }>
                    { renderMainFormFields() }
                    { renderMediaGallerySection() }
                </Form>
            </div>
        </div>
    )
}