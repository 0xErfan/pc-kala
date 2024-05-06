import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/login', '/register', '/profile'],
};

export default async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    let cookie = request.cookies.get('token');

    if (path == '/login' || path == '/register') {
        if (cookie) return NextResponse.redirect(new URL('http://localhost:3000', request.url));
        return NextResponse.next();

    } else if (path == '/profile') {
        if (!cookie) return NextResponse.redirect(new URL('http://localhost:3000/login', request.url));
        return NextResponse.next();
    }
}