import Link from 'next/link';
import MenuIcon from '@/components/MenuIcon';
import DashboardIcon from '@/components/DashboardIcon';

export default function Navbar() {
    const renderMap = [
        {
            title: 'Dashboard',
            to: 'dashboard',
            icon: <DashboardIcon />
        },
        {
            title: 'Menu manager',
            to: 'menus',
            icon: <MenuIcon />
        }
    ];

    const renderNavLinks = () => {
        return (
            <ul className="flex flex-col gap-8">
            { renderMap.map(({ title, to, icon }, key) => (
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
            )) }
            </ul>
        );
    }

    return (
        <div className="bg-navbar border-r border-line h-screen p-6">
            { renderNavLinks() }
        </div>
    );
}