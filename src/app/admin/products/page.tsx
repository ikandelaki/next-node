import Link from "next/link";

export default function ProductPage() {
    return (
        <section className="Section flex items-center">
            <h1>Products</h1>
            <div className="ml-auto">
                <Link href="products/create" className="Button">Create</Link>
            </div>
        </section>
    )
}