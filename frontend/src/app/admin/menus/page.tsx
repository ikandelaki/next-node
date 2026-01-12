import Link from "next/link";
import prisma from '@/lib/prisma';
import Table from "@/components/Table/Table";
import { capitalizeFirstLetter } from "@/utils/utils";

export default async function MenusPage() {
    const menus = await prisma.menu.findMany();

    const renderMenus = () => {
        if (!menus?.length) {
            return null;
        }

        const columns = Object.keys(menus[0]).map((column) => ({ id: column, label: capitalizeFirstLetter(column) }));
        return (
            <Table data={ menus } columns={ columns } className="mt-4 max-w-7xl mx-auto" shouldRenderLink />
        );
    }

    return (
        <div className="AdminPage">
            <div className="flex">
                <h1>Welcome to menu manager</h1>
                <Link href='/admin/menus/create' className="Button mt-4 ml-auto">Create</Link>
            </div>
            { renderMenus() }
        </div>
    )
}