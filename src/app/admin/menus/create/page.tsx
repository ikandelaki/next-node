'use client';

import Field from "@/components/Field/Field";
import FieldGroup from "@/components/FieldGroup";
import { ERROR_TYPE, SUCCESS_TYPE, useNotificationStore } from "@/store/useNotificationStore";
import { getFormattedMenuDataFromForm } from "../lib/utils";
import { fetchNext } from "@/utils/fetchData";

export default function CreateMenuPage() {
    const setNotifications = useNotificationStore((state) => state.setNotifications);

    const createMenu = async (formData: FormData) => {
        const rawFormData = getFormattedMenuDataFromForm(formData);
        const { name, identifier, menuItems } = rawFormData || {};

        if (!name || !identifier || !menuItems?.length) {
            setNotifications({ type: ERROR_TYPE, message: 'Please fill out all the necessary fields' });

            return;
        }

        const response = await fetchNext('menus/create', JSON.stringify(rawFormData));
        const { type, message } = response;

        if (response.type === SUCCESS_TYPE) {
            setNotifications({ type, message: 'Menu created successfully' });
            
            return;
        }

        setNotifications({ type, message });
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