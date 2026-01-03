import Field from "@/components/Field/Field"
import FieldGroup from "@/components/FieldGroup";

export default function CreateMenuPage() {
    const createMenu = async (formData: FormData) => {
        'use server'

        const title = formData.get('menu-title');
        const titles = formData.getAll('menu-item-title').map(v => String(v));
        const links = formData.getAll('menu-item-link').map(v => String(v));

        const items = titles.map((t, i) => ({ title: t, link: links[i] ?? '' }));

        const rawFormData = {
            title,
            items
        };

        console.log('>> Object.fromEntries(formData)', Object.fromEntries(formData));
        console.log('>> rawFormData', rawFormData);
    }

    return (
        <div className='AdminPage'>
            <h1>Create menu</h1>
            <form action={ createMenu }>
                <Field type='text' placeholder='Menu title' label='Menu title' id='menu-title' />
                <FieldGroup label='menu-items' isMultipliable className='mt-4'>
                    {(i) => (
                        <>
                            <Field
                                type='text'
                                placeholder='title'
                                label='Menu item title'
                                id={`menu-item-title-${i}`}
                                name='menu-item-title'
                            />
                            <Field
                                type='text'
                                placeholder='link'
                                label='Menu item link'
                                id={`menu-item-link-${i}`}
                                name='menu-item-link'
                            />
                        </>
                    )}
                </FieldGroup>
                <button type='submit' className="Button mt-8">Submit</button>
            </form>
        </div>
    )
}