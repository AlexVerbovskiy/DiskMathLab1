import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const names = req.url.split("/");
    const namePage = names[names.length - 1];
    if (typeof window === 'undefined'){
        if(namePage === "/")
            return NextResponse.redirect("/login")
        return;
    }
    const nameUser = localStorage.getItem('name')
    console.log(nameUser);
    switch (namePage) {
        case "login":
            if (nameUser) {
                NextResponse.redirect("/")
            }
            break;
        case "/":
            if (!nameUser) {
                NextResponse.redirect("/login")
            }
            break;
    }
}