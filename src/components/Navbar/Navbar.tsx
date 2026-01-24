'use client';

import Link from 'next/link';
import MenuIcon from '@/components/MenuIcon';
import DashboardIcon from '@/components/DashboardIcon';
import CubeIcon from '../CubeIcon';
import ChevronIcon from '../ChevronIcon';
import { useState, MouseEvent } from 'react';

type MenuItemType = {
    title: string;
    to?: string,
    icon: React.ReactNode,
    isExpandable?: boolean,
    children?: { [key: string]: MenuItemType[] }
}

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [expandedMenuId, setExpandedMenuId] = useState<number | null>(null);

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
                        isExpandable: false,
                    }
                ]
            }
        }
    ];

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        const index = event.currentTarget?.dataset?.index;

        if (!index) {
            return;
        }

        setIsExpanded(!isExpanded);
        setExpandedMenuId(parseInt(index));
    }

    const renderNavLink = (
        { title, to, icon, isExpandable, children }: MenuItemType,
        key: number
    ) => {
        if (!isExpandable) {
            return (
                <li key={ `${to}-${key}` }>
                    <Link href={ `/admin/${to}` } className="flex w-max gap-2 items-center">
                        <div className="w-6 h-6">
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
                data-index={ key }
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
            <ul className="flex flex-col gap-8 bg-navbar">
                { renderMap.map((menu, key) => renderNavLink(menu, key)) }
            </ul>
        );
    }

    const renderSection = (title: string, children: { [key:string]: MenuItemType[] }, key = 0) => {
        return (
            <ul key={ `${title}-${key}` }>
                <h2 className='mb-2'>{ title }</h2>
                { children[title].map(
                    (content: MenuItemType, key: number) => renderNavLink(content, key)
                ) }
            </ul>
        );
    }

    const renderSections = (children: { [key:string]: MenuItemType[] }) => {
        return Object.keys(children).map(
            (title, key) => renderSection(title, children, key)
        )
    }

    const renderExpandableSidebarContent = () => {
        const menu = renderMap[expandedMenuId || 0];

        const { children = {} } = menu || {};
        return (
            <div className={`absolute w-full left-full top-0 bg-navbar h-full p-6
                transition-all duration-300 ${isExpanded ? 'translate-x-0 shadow-2xl border-r border-line' : '-translate-x-full border-none'} -z-9`}>
                { renderSections(children) }
            </div>
        )
    }

    return (
        <div className={`bg-navbar border-r border-line h-screen p-6 relative z-9 shadow-2xl`}>
            { renderNavLinks() }
            { renderExpandableSidebarContent() }
        </div>
    );
}