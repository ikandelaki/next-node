import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMenuForm from "./_components/EditMenuForm";

export default async function Menu({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const menu = await prisma.menu.findUnique({
        where: { id: parseInt(id) },
        include: { menuItems: true }
    })

    if (!menu) {
        notFound();
    }

    return (
        <section className="Section">
            <h1>Edit Menu</h1>
            <EditMenuForm menu={ menu } />
        </section>
    )
}