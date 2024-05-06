import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/login', '/register'],
};

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/register') {
        let cookie = request.cookies.get('token');
        console.log(cookie)
        if (cookie) return NextResponse.redirect(new URL('http://localhost:3000', request.url));
        return NextResponse.next();
    }
}