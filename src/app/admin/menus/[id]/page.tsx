import Field from "@/components/Field";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import FieldGroup from "@/components/FieldGroup";

export default async function Menu({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const menu = await prisma.menu.findUnique({
        where: { id: parseInt(id) },
        include: { menuItems: true }
    })

    if (!menu) {
        notFound();
    }

    const renderMenuItems = () => {
        return (
            <div className="mt-6 w-max">
                <h2 className="text-xl">Menu items</h2>
            {
                menu.menuItems.map((menuItem, key) => (
                    <FieldGroup className='mt-2 py-2 border-b border-line' key={ key }>
                        <Field
                            type='text'
                            placeholder='title'
                            label='Menu item title'
                            id={`menu-item-title-${key}`}
                            name='menu-item-title'
                            isRequired
                            defaultValue={ menuItem.label }
                            className="[&>input]:ml-auto"
                        />
                        <Field
                            type='text'
                            placeholder='link'
                            label='Menu item link'
                            id={`menu-item-link-${key}`}
                            name='menu-item-link'
                            isRequired
                            defaultValue={ menuItem.link }
                            className="[&>input]:ml-auto"
                        />
                    </FieldGroup>
                ))
            }
        </div>
        )
    }

    const editMenu = async (formData: FormData) => {
        'use server';
        console.log('>> formData', formData);
    }

    return (
        <section className="Section">
            <h1>Edit Menu</h1>
            <form action={ editMenu } className="w-max">
                <Field
                    type='text'
                    placeholder='Menu name'
                    label='Menu name'
                    id='menu-name'
                    isRequired
                    className="[&>input]:ml-auto"
                    defaultValue={ menu.name } />
                <Field
                    type='text'
                    placeholder='Menu identifier'
                    label='Menu identifier'
                    id='menu-identifier'
                    isRequired
                    className="mt-2 [&>input]:ml-auto"
                    defaultValue={ menu.identifier } />
                { renderMenuItems() }
                <button type='submit' className="Button mt-4">Submit</button>
            </form>
        </section>
    )
}