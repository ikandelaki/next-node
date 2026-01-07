'use client';

import Field from "@/components/Field/Field";
import FieldGroup from "@/components/FieldGroup";
import { toKebabCase } from "@/utils/utils";

export default function CreateMenuPage() {
    const createMenu = async (formData: FormData) => {
        const title = String(formData.get('menu-title'));
        const titles = formData.getAll('menu-item-title').map(v => String(v));
        const links = formData.getAll('menu-item-link').map(v => String(v));

        const items = titles.map((t, i) => ({ title: t, link: links[i] ?? '' }));
        const code = toKebabCase(title);

        const rawFormData = {
            title,
            code,
            items
        };

        if (!title || !code || !items?.length) {
            console.error('>> Please fill out all the necessary fields');
            return;
        }

        const res = await fetch('http://localhost:8000/menus/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...rawFormData
            })
        });

        const data = await res.json();
        console.log('>> data', data);
    }

    return (
        <div className='AdminPage'>
            <h1>Create menu</h1>
            <form action={ createMenu }>
                <Field type='text' placeholder='Menu title' label='Menu title' id='menu-title' isRequired />
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
        </div>
    )
}