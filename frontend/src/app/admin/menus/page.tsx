import Link from "next/link"

export default function MenusPage() {
    return (
        <div className="AdminPage">
            <h1>Welcome to menu manager</h1>
            <Link href='/admin/menus/create' className="Button">Create</Link>
        </div>
    )
}