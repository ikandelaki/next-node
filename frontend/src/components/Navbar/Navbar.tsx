import Link from 'next/link';

export default function Navbar() {
    const renderMap = [
        {
            title: 'Dashboard',
            to: 'dashboard'
        },
        {
            title: 'Menu manager',
            to: 'menus'
        }
    ];

    const renderNavLinks = () => {
        return (
            <ul>
            { renderMap.map(({ title, to }, key) => (
                <li key={ `${to}-${key}` }>
                    <Link href={ `/admin/${to}` }>
                        { title }
                    </Link>
                </li>
            )) }
            </ul>
        );
    }

    return (
        <div className="bg-navbar h-screen p-2">
            { renderNavLinks() }
        </div>
    );
}