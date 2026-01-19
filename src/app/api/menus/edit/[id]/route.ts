import { ERROR_TYPE, SUCCESS_TYPE } from "@/store/useNotificationStore";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { toKebabCase } from "@/lib/utils";

type MenuItemType = {
    id?: number,
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

    if (menuItems.find((item) => !item.label || !item.link)) {
        return NextResponse.json(
            { type: ERROR_TYPE, message: 'Menu item title and link can not be empty' },
            { status: 400 }
        )
    }

    // Check unique identifier
    const existingMenu = await prisma.menu.findUnique({
        where: { id: Number(id) },
        include: { menuItems: true }
    });

    if (!existingMenu) {
        return NextResponse.json(
            { type: ERROR_TYPE, message: `A menu with the id ${id} does not exist.` },
            { status: 409 }
        );
    }

    try {
        const updates: Partial<{ name: string; identifier: string }> = {};
        if (name !== existingMenu.name) {
            updates.name = name;
        }

        if (identifier !== existingMenu.identifier) {
            updates.identifier = identifier;
        }

        const existingItemIds = existingMenu.menuItems.map(item => item.id);
        const incomingItemIds = menuItems.filter(item => item.id).map(item => item.id!);
        const toDeleteIds = existingItemIds.filter(id => !incomingItemIds.includes(id));
        const toUpdateItems = menuItems.filter(item => item.id);
        const toCreateItems = menuItems.filter(item => !item.id);

        await prisma.$transaction(async (tx) => {
            if (Object.keys(updates).length > 0) {
                await tx.menu.update({ where: { id: Number(id) }, data: updates });
            }
            if (toDeleteIds.length > 0) {
                await tx.menuItem.deleteMany({ where: { id: { in: toDeleteIds } } });
            }
            for (const item of toUpdateItems) {
                const existingItem = existingMenu.menuItems.find(ei => ei.id === item.id);
                if (existingItem && (item.label !== existingItem.label || item.link !== existingItem.link)) {
                    await tx.menuItem.update({
                        where: { id: item.id },
                        data: { label: item.label, code: toKebabCase(item.label), link: item.link }
                    });
                }
            }
            for (const item of toCreateItems) {
                await tx.menuItem.create({
                    data: { label: item.label, code: toKebabCase(item.label), link: item.link, parentId: Number(id) }
                });
            }
        });

        return NextResponse.json(
            { type: SUCCESS_TYPE, message: 'Menu updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { type: SUCCESS_TYPE, message: error },
            { status: 200 }
        );
    }
}