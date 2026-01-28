import Field from '@/components/Field';
import Form from '@/components/Form';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { productAttributes } from '../_data/productAttributes';
import ImageUpload from '@/components/ImageUpload';
import Expandable from '@/components/Expandable';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return notFound();
    }

    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { media_gallery: true }
    })

    if (!product) {
        return notFound();
    }

    const formId = `editProduct-${product.id}`;
    const { media_gallery } = product;

    const formAction = async (formData: FormData) => {
        "use server";
        console.log('>> formData', formData);
    }

    const renderSaveButton = () => {
        return <button type='submit' className="Button bg-red-500" form={ formId }>Save</button>;
    }

    const renderHeading = () => {
        return (
            <div className="Section flex items-center">
                <h1>Edit product <b>{ product.name }</b></h1>
                <div className="ml-auto">
                    { renderSaveButton() }
                </div>
            </div>
        )
    }

    const renderMainForm = () => {
        return (
            <Form action={ formAction } id={ formId }>
                { productAttributes.map(({ type, placeholder, label, id, isRequired }, key) => {
                    return <Field
                        key={ label }
                        name={ label }
                        id={ id }
                        type={ type }
                        placeholder={ placeholder }
                        defaultValue={ product?.[id] }
                        label={ label }
                        className={ `${ key ? 'mt-2' : '' }` }
                        isRequired={ isRequired }
                    />
                }) }
            </Form>
        )
    }

    const renderMediaGallerySection = () => {
        return (
            <section className="mt-16">
                <Expandable title="Media gallery" shouldRenderBottomLine={true}>
                    <ImageUpload isSquare mediaGallery={ media_gallery } />
                </Expandable>
            </section>
        );
    };

    return (
        <section>
            { renderHeading() }
            <div>
                { renderMainForm() }
                { renderMediaGallerySection() }
            </div>
        </section>
    )
}