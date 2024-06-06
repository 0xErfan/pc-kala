import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/login', '/register', '/profile', '/transactionDetails', '/checkout'],
};

export default async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    let cookie = request.cookies.get('token')?.value;

    if (path == '/login' || path == '/register') {
        if (cookie) return NextResponse.redirect(new URL('http://localhost:3000', request.url));
    }

    if (path == '/profile') {
        if (!cookie) return NextResponse.redirect(new URL('http://localhost:3000/login', request.url));
    }

    if (path == '/transactionDetails') {
        if (!cookie) return NextResponse.redirect(new URL('http://localhost:3000/', request.url));
    }

    if (path == '/checkout') {
        
        if (!cookie) return NextResponse.redirect(new URL('http://localhost:3000/', request.url));
        
        // this scope check for user basket so if its empty, checkout page is forbidden
        const response = await fetch('http://localhost:3000/api/UserRelatedData/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cookie)
        })

        const { userRelatedData } = await response.json()

        if (!userRelatedData.BasketItem?.length) return NextResponse.redirect(new URL('http://localhost:3000/', request.url));
    }

    return NextResponse.next()
}