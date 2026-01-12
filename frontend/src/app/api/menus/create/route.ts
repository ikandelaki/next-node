import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { ERROR_TYPE, SUCCESS_TYPE } from "@/store/useNotificationStore";
import { revalidatePath } from "next/cache";

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

export async function POST(request: NextRequest) {
    try {
        const body: Body = await request.json();

        const { name, identifier, menuItems } = body;

        if (!name || !identifier || menuItems?.length === 0) {
            return NextResponse.json(
                { type: ERROR_TYPE, message: 'Please provide name, identifier and at least one menu item.' },
                { status: 400 }
            );
        }

        // Check unique identifier
        const existing = await prisma.menu.findUnique({ where: { identifier } });
        if (existing) {
            return NextResponse.json(
                { type: ERROR_TYPE, message: 'A menu with this identifier already exists.' },
                { status: 409 }
            );
        }

        const created = await prisma.menu.create({
            data: {
                name,
                identifier,
                menuItems: {
                    create: menuItems.map((menuItem) => ({
                        label: menuItem.label ?? '',
                        code: menuItem.code ?? '',
                        link: menuItem.link ?? ''
                    }))
                }
            },
            include: { menuItems: true }
        });

        console.log('>> created', created);

        revalidatePath('/menus');
        return NextResponse.json({
            type: SUCCESS_TYPE,
            data: created
        }, { status: 201 });
    } catch(err) {
        console.error('>> err', err);
        return NextResponse.json({
            type: ERROR_TYPE,
            message: 'Could not create menu',
            data: []
        }, { status: 400 });
    }
}