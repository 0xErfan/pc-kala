import { NextRequest, NextResponse } from "next/server";
import { userDataTypes } from "./global.t";

export const config = {
    matcher: ['/login', '/register', '/profile', '/transactionDetails', '/checkout', '/admin-panel/:path*'],
};

export default async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    let cookie = request.cookies.get('token')?.value;

    if (path == '/login' || path == '/register') {

        if (!cookie) return NextResponse.next()

        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/me`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cookie)
            })

            if (!res.ok) return NextResponse.next()

            return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));

        } catch (error) {
            console.log(error)
            if (cookie) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));
        }
    }

    if (path == '/profile') {
        if (!cookie) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/login`, request.url));
    }

    if (path == '/transactionDetails') {
        if (!cookie) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));
    }

    if (path.startsWith('/admin-panel')) {

        try {

            if (!cookie) throw new Error('Access denied bro')

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/me`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cookie)
            })

            const data: userDataTypes = await res.json()
            if (!res.ok || data.role !== 'ADMIN') throw new Error('Access denied bro')

            return NextResponse.next()

        } catch (error) {
            console.log(error)
            return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));
        }
    }

    return NextResponse.next()
}