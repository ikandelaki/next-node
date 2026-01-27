import Link from "next/link";
import prisma from '@/lib/prisma';
import Table from "@/components/Table/Table";
import { getTableColumnData } from "@/lib/utils";

export default async function ProductPage() {
    const products = await prisma.product.findMany();

    const renderNoProducts = () => {
        return (
            <div className="Section mt-4">
                You have no products...
            </div>
        )
    }

    const renderProductsTable = () => {
        if (!products || !products?.length) {
            return renderNoProducts();
        }

        return (
            <div className="Section px-2 mt-8">
                <Table
                    data={ products }
                    columns={ getTableColumnData(products) }
                    shouldRenderLink
                />
            </div>
        )
    }

    return (
        <section>
            <div className="Section flex items-center">
                <h1>Products</h1>
                <div className="ml-auto">
                    <Link href="products/create" className="Button">Create</Link>
                </div>
            </div>
            { renderProductsTable() }
        </section>
    )
}