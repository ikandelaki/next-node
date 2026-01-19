import prisma from '@/lib/prisma';
import { MenuItemType } from '@/types/menu';
import Link from 'next/link';

export default async function Menu() {
    const menu = await prisma.menu.findUnique({
        where: {
            identifier: 'cards'
        },
        include: {
            menuItems: true
        }
    });

    if (!menu) {
        return null;
    }

    const renderMenuItem = ({ id, label, link }: MenuItemType) => {
        return (
            <div className="hover-underline">
                <Link href={ link } key={ id }>{ label }</Link>
            </div>
        )
    }

    const renderMenuItems = () => {
        return menu.menuItems.map((menuItem) => renderMenuItem(menuItem))
    }

    return (
        <div className="w-full flex py-2 px-4 gap-8">
            { renderMenuItems() }
        </div>
    )
}