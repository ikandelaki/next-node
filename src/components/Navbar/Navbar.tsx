'use client';

import Link from 'next/link';
import MenuIcon from '@/components/MenuIcon';
import DashboardIcon from '@/components/DashboardIcon';
import CubeIcon from '../CubeIcon';
import ChevronIcon from '../ChevronIcon';
import { useState } from 'react';

type MenuItemType = {
    title: string;
    to?: string,
    icon: React.ReactNode,
    isExpandable?: boolean,
    children?: { [key: string]: MenuItemType[] }
}

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderMap: MenuItemType[] = [
        {
            title: 'Dashboard',
            to: 'dashboard',
            icon: <DashboardIcon />,
            isExpandable: false
        },
        {
            title: 'Menu manager',
            to: 'menus',
            icon: <MenuIcon />,
            isExpandable: false
        },
        {
            title: "Content",
            to: '',
            icon: <CubeIcon />,
            isExpandable: true,
            children: {
                'Entities': [
                    {
                        title: "Products",
                        to: 'products',
                        icon: <CubeIcon />,
                        isExpandable: true,
                    }
                ]
            }
        }
    ];

    const handleButtonClick = () => {
        setIsExpanded(!isExpanded);
    }

    const renderNavLink = (
        { title, to, icon, isExpandable, children }: MenuItemType,
        key: number
    ) => {
        if (!isExpandable) {
            return (
                <li key={ `${to}-${key}` }>
                    <Link href={ `/admin/${to}` } className="flex w-max gap-2 items-center">
                        <div className="w-5 h-5">
                            { icon && icon }
                        </div>
                        <div>
                            { title }
                        </div>
                    </Link>
                </li>
            )
        }

        return (
            <button
                className='flex w-full gap-2 items-center cursor-pointer'
                key={ `${title}-${key}` }
                onClick={ handleButtonClick }
            >
                { icon && icon }
                <span className="cursor-pointer">{ title }</span>
                <span className='rotate-270 ml-auto'>
                    <ChevronIcon />
                </span>
            </button>
        )
    }

    const renderNavLinks = () => {
        return (
            <ul className="flex flex-col gap-8">
                { renderMap.map((menu, key) => renderNavLink(menu, key)) }
            </ul>
        );
    }

    return (
        <div className={`bg-navbar border-r border-line h-screen p-6 grid grid-rows-[${isExpanded ? '2' : '1'}fr]`}>
            { renderNavLinks() }
        </div>
    );
}