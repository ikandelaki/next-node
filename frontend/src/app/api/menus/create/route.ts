import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const res = await request.json();
    console.log('>> request', request);
    console.log('>> res', res);
    console.log('>> request.body', request.body);
}