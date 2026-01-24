import { toKebabCase, transformSpaceIntoHyphens } from "@/lib/utils";

export const getFormattedMenuDataFromForm = (formData: FormData) => {
    const name = String(formData.get('menu-name'));
    const identifier = toKebabCase(String(formData.get('menu-identifier')));
    const titles = formData.getAll('menu-item-title').map(v => String(v));
    const links = formData.getAll('menu-item-link').map(v => String(v));
    const ids = formData
        .getAll('menu-item-id')
        .map((itemId) => itemId === '' ? null : Number(itemId));

    const menuItems = titles.map((t, i) => ({
        id: ids[i],
        label: t,
        code: toKebabCase(t),
        link: transformSpaceIntoHyphens(links[i]) ?? ''
    }));

    const rawFormData = {
        name,
        identifier,
        menuItems
    };

    return rawFormData;
}
