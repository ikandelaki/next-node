import Link from "next/link";
import prisma from '@/lib/prisma';
import Table from "@/components/Table/Table";
import { capitalizeFirstLetter } from "@/lib/utils";

export default async function MenusPage() {
    const menus = await prisma.menu.findMany();

    const renderMenus = () => {
        if (!menus?.length) {
            return null;
        }

        const columns = Object.keys(menus[0]).map((column) => ({ id: column, label: capitalizeFirstLetter(column) }));
        return (
            <Table data={ menus } columns={ columns } className="max-w-7xl mx-auto" shouldRenderLink />
        );
    }

    return (
        <div>
            <section className="flex items-center Section">
                <h1>Welcome to menu manager</h1>
                <Link href='/admin/menus/create' className="Button ml-auto">Create</Link>
            </section>
            <section className="Section mt-4">
                { renderMenus() }
            </section>
        </div>
    )
}