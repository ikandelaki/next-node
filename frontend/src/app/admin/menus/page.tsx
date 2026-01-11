import Link from "next/link";
import prisma from '@/lib/prisma';
import { MenuType } from "@/lib/server/types/MenuType";

export default async function MenusPage() {
    const menus = await prisma.menu.findMany();

    const renderMenus = () => {
        if (!menus?.length) {
            return null;
        }
        
        return menus.map((menu: MenuType, key: number) => (
            <div key={ `${key}-${menu.id}` }>
                <span>{ menu.name }</span>
                <span>{ menu.identifier }</span>
            </div>
        ));
    }

    return (
        <div className="AdminPage">
            <h1>Welcome to menu manager</h1>
            { renderMenus() }
            <Link href='/admin/menus/create' className="Button">Create</Link>
        </div>
    )
}