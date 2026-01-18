'use client';

import Field from "@/components/Field"
import FieldGroup from "@/components/FieldGroup"
import type { MenuGetPayload } from "@/app/generated/prisma/models/Menu";

type EditMenuFormProps = {
    menu: MenuGetPayload<{ include: { menuItems: true } }>
}

export default function EditMenuForm({ menu }: EditMenuFormProps) {
     const renderMenuItems = () => {
        return (
            <div className="mt-6 w-max">
                <h2 className="text-xl">Menu items</h2>
            {
                menu.menuItems.map((menuItem, idx) => (
                    <FieldGroup
                        className='mt-2 py-2 border-b border-line'
                        key={ idx }
                        isMultipliable={ idx === menu.menuItems.length - 1 }
                    >
                        { (key) => (
                            <>
                                <Field
                                    type='text'
                                    placeholder='title'
                                    label='Menu item title'
                                    id={`${menuItem.code}-${key}`}
                                    name='menu-item-title'
                                    isRequired
                                    defaultValue={ menuItem.label }
                                    className="[&>input]:ml-auto"
                                />
                                <Field
                                    type='text'
                                    placeholder='link'
                                    label='Menu item link'
                                    id={`${menuItem.link}-${key}`}
                                    name='menu-item-link'
                                    isRequired
                                    defaultValue={ menuItem.link }
                                    className="[&>input]:ml-auto"
                                />
                            </>
                        ) }
                    </FieldGroup>
                ))
            }
        </div>
        )
    }

    const editMenu = async (formData: FormData) => {
        console.log('>> formData', formData.getAll('menu-item-link'));
    }

    return (
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
    )
}