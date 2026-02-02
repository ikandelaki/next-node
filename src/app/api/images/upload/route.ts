/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ERROR_TYPE, SUCCESS_TYPE } from '@/store/useNotificationStore';
import prisma from '@/lib/prisma';

const publicDir = '/public/uploads/catalog/product/';
const uploadDir = path.join(process.cwd(), publicDir);

export async function POST(request: NextRequest) {
    await fs.promises.mkdir(uploadDir, { recursive: true });
    
    try {
        const formData = await request.formData();
        const files: File[] = formData.getAll('file') as File[];
        const productId: string = formData.get('productId') as string ?? '';

        const allFilePaths = [];
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.join(uploadDir, file.name);

            await fs.promises.writeFile(filePath, buffer);
            allFilePaths.push(publicDir + file.name);
        }

        if (productId) {
            const product = await prisma.product.findUnique({
                where: {
                    id: parseInt(productId)
                }
            });

            if (product) {
                await prisma.image.createMany({
                    data: allFilePaths.map((filePath: string) => (
                        { parentId: parseInt(productId), url: filePath, role: '' }
                    ))
                });
            }
        }

        return NextResponse.json({
            type: SUCCESS_TYPE,
            message: 'File uploaded successfully',
            data: allFilePaths
        }, { status: 200 })
    } catch (err: any) {
        console.error('>> err', err);
        return NextResponse.json({
            type: ERROR_TYPE, message: 'Error while uploading file'
        }, { status: 400 })
    }
}