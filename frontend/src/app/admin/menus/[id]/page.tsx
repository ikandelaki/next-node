import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Menu({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const menu = await prisma.menu.findUnique({
        where: { id: parseInt(id) }
    })

    if (!menu) {
        notFound();
    }

    return (
        <div>
            <h1>{ menu.name }</h1>
            <h2>{ menu.identifier }</h2>
        </div>
    )
}