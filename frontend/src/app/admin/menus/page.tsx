import Link from "next/link";
import MenuRepository from "@/lib/server/repository/MenuRepository";

export default async function MenusPage() {
    const menuRepository = new MenuRepository();
    const data = await menuRepository.getAll();
    console.log('>> data', data);

    return (
        <div className="AdminPage">
            <h1>Welcome to menu manager</h1>
            <Link href='/admin/menus/create' className="Button">Create</Link>
        </div>
    )
}