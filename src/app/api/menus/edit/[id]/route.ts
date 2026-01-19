import { ERROR_TYPE, SUCCESS_TYPE } from "@/store/useNotificationStore";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

type MenuItemType = {
    label: string,
    code: string,
    link: string,
}

type Body = {
    name: string,
    identifier: string,
    menuItems: MenuItemType[]
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const body: Body = await request.json();
    const { id } = await params;

    const { name, identifier, menuItems } = body;

    if (!name || !identifier || menuItems?.length === 0) {
        return NextResponse.json(
            { type: ERROR_TYPE, message: 'Please provide name, identifier and at least one menu item.' },
            { status: 400 }
        );
    }

    // Check unique identifier
    const existing = await prisma.menu.findUnique({ where: { id: Number(id) } });
    if (!existing) {
        return NextResponse.json(
            { type: ERROR_TYPE, message: `A menu with the id ${id} does not exist.` },
            { status: 409 }
        );
    }

    try {
        const result = await prisma.menu.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                identifier,
                menuItems: {
                    deleteMany: {},
                    create: menuItems.map(item => ({
                        label: item.label,
                        code: item.code,
                        link: item.link
                    }))
                }
            }
        })

        return NextResponse.json(
            { type: SUCCESS_TYPE, message: 'Menu updated successfully', data: result },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { type: SUCCESS_TYPE, message: error },
            { status: 200 }
        );
    }
}