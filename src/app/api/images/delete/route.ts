import prisma from "@/lib/prisma";
import { ERROR_TYPE, SUCCESS_TYPE } from "@/store/useNotificationStore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const imageId = await request.json();

        await prisma.image.delete({
            where: {
                id: imageId
            }
        })

        return NextResponse.json(
            { type: SUCCESS_TYPE, message: `Image deleted successfully`, data: imageId },
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { type: ERROR_TYPE, message: 'Could not delete the image' },
            { status: 400 }
        )
    }
}