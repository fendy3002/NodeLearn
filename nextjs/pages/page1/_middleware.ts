import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    //console.log(req.url, req.nextUrl, req.headers);
    console.log("middleware start");
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log("middleware after 3 secs");
            resolve();
        }, 3000);
    })
}