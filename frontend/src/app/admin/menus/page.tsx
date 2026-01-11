import Link from "next/link";
import MenuRepository from "@/lib/server/repository/MenuRepository";
import { MenuType } from "@/lib/server/types/MenuType";

export default async function MenusPage() {
    const menuRepository = new MenuRepository();
    const menus = await menuRepository.getAll();

    const renderMenus = () => {
        if (!menus?.length) {
            return null;
        }
        
        return menus.map((menu: MenuType, key: number) => (
            <div key={ `${key}-${menu.title}` }>
                <span>{ menu.title }</span>
                <span>{ menu.code }</span>
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