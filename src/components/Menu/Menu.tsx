import prisma from '@/lib/prisma';
import { MenuItemType } from '@/types/menu';
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '../LogoIcon';

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
            <div className="hover-underline" key={ id }>
                <Link href={ link }>{ label }</Link>
            </div>
        )
    }

    const renderMenuItems = () => {
        return menu.menuItems.map((menuItem) => renderMenuItem(menuItem))
    }

    const renderLogo = () => {
        return (
            <div className='w-8 h-8 transition-all duration-150 ml-auto'>
                <Link href="/">
                    <LogoIcon />
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full items-center flex py-2 px-4 gap-8 bg-navbar">
            { renderMenuItems() }
            { renderLogo() }
        </div>
    )
}