import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { ERROR_TYPE, SUCCESS_TYPE } from "@/store/useNotificationStore";
import { revalidatePath } from "next/cache";
import { MenuType } from "@/lib/server/types/MenuType";

export async function POST(request: NextRequest) {
    try {
        const res = await request.json();

        // Prepare data for Prisma: convert any menuItems array into nested create input
        const data: any = { ...res };
        if (Array.isArray((data as any).menuItems)) {
            data.menuItems = {
                create: (data.menuItems as any[]).map(({ parentId, ...rest }) => ({ ...rest }))
            };
        }

        await prisma.menu.create({ data });

        revalidatePath('/menus');
        return NextResponse.json({
            type: SUCCESS_TYPE,
            data: res
        });
    } catch(err) {
        console.error('>> err', err);
        return NextResponse.json({
            type: ERROR_TYPE,
            message: 'Could not create menu',
            data: []
        });
    }
}