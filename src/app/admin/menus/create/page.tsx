'use client';

import Field from "@/components/Field/Field";
import FieldGroup from "@/components/FieldGroup";
import { ERROR_TYPE, SUCCESS_TYPE, useNotificationStore } from "@/store/useNotificationStore";
import { toKebabCase, transformSpaceIntoHyphens } from "@/utils/utils";

export default function CreateMenuPage() {
    const setNotifications = useNotificationStore((state) => state.setNotifications);

    const createMenu = async (formData: FormData) => {
        const name = String(formData.get('menu-name'));
        const titles = formData.getAll('menu-item-title').map(v => String(v));
        const links = formData.getAll('menu-item-link').map(v => String(v));

        const menuItems = titles.map((t, i) => ({
            label: t,
            code: toKebabCase(t),
            link: transformSpaceIntoHyphens(links[i]) ?? ''
        }));
        const identifier = toKebabCase(name);

        const rawFormData = {
            name,
            identifier,
            menuItems
        };

        if (!name || !identifier || !menuItems?.length) {
            setNotifications({ type: ERROR_TYPE, message: 'Please fill out all the necessary fields' });

            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/menus/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...rawFormData
                })
            });

            const response = await res.json();

            if (response.type === SUCCESS_TYPE) {
                setNotifications({ type: SUCCESS_TYPE, message: 'Menu created successfully' });
            }

            if (response.type === ERROR_TYPE) {
                setNotifications({ type: ERROR_TYPE, message: 'Could not create menu' });
            }
        } catch(err) {
            if (typeof err === 'string') {
                setNotifications({ type: ERROR_TYPE, message: err });    
            }

            setNotifications({ type: ERROR_TYPE, message: 'Error while creating the menu' });
        }
    }

    return (
        <section>
            <div className="Section">
                <h1>Create menu</h1>
            </div>
            <form action={ createMenu } className="Section mt-4">
                <Field type='text' placeholder='Menu name' label='Menu name' id='menu-name' isRequired />
                <FieldGroup label='menu-items' isMultipliable className='mt-4'>
                    {(i) => (
                        <>
                            <Field
                                type='text'
                                placeholder='title'
                                label='Menu item title'
                                id={`menu-item-title-${i}`}
                                name='menu-item-title'
                                isRequired
                            />
                            <Field
                                type='text'
                                placeholder='link'
                                label='Menu item link'
                                id={`menu-item-link-${i}`}
                                name='menu-item-link'
                                isRequired
                            />
                        </>
                    )}
                </FieldGroup>
                <button type='submit' className="Button mt-8">Submit</button>
            </form>
        </section>
    )
}