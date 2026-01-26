import Field from '@/components/Field';
import Form from '@/components/Form';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { productAttributes } from '../_data/productAttributes';

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

    const formAction = async (formData: FormData) => {
        "use server";
        console.log('>> formData', formData);
    }

    console.log('>> Object.keys(product)', Object.keys(product));

    return (
        <section>
            <div className="Section">
                <h1>Edit product <b>{ product.name }</b></h1>
            </div>
            <div>
                <Form action={ formAction }>
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
            </div>
        </section>
    )
}