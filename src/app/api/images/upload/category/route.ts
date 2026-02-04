import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { ERROR_TYPE, SUCCESS_TYPE } from "@/store/useNotificationStore";

const publicDir = "/public/uploads/catalog/category/";
const uploadDir = path.join(process.cwd(), publicDir);

export async function POST(request: NextRequest) {
    await fs.promises.mkdir(uploadDir, { recursive: true });

    try {
        const formData = await request.formData();
        const file: File = formData.get("file") as File;

        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(uploadDir, file.name);

        await fs.promises.writeFile(filePath, buffer);

        return NextResponse.json(
            {
                type: SUCCESS_TYPE,
                message: "File uploaded successfully",
                data: publicDir + file.name,
            },
            { status: 200 },
        );
    } catch (err: any) {
        console.error(">> err", err);
        return NextResponse.json(
            {
                type: ERROR_TYPE,
                message: "Error while uploading file",
            },
            { status: 400 },
        );
    }
}
