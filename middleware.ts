import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from 'negotiator' //install  their types also
import { i18n } from "./i18n.config";

// Get Locale Handeler
function getLocale(request: NextRequest): string | undefined {
    // Negotiatior expect plain object so we need to transform headers
    const negotiatorHeader: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeader[key] = value))

    // Use negotiator and intial-localmathcer to get best locale
    let languages = new Negotiator({ headers: negotiatorHeader }).languages();
    // @ts-ignore locale are readonly 
    const locales: string[] = i18n.locales
    return matchLocale(languages, locales, i18n.defaultLocale)
}


// Middleware
export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';

    const isBot = /Googlebot|Bingbot|DuckDuckBot|Slurp|YandexBot/i.test(userAgent);

    // ✅ Evita redirección para bots
    if (isBot && pathname === '/') {
        return NextResponse.next();
    }

    // ✅ Redirige solo en la raíz del sitio
    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/es'; // o '/en' si quieres usar otro idioma por defecto
        return NextResponse.redirect(url, 302);
    }

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Skip middleware for sitemap, robots.txt, etc.
    if (
        pathname === '/sitemap.xml' ||
        pathname === '/robots.txt' ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }

    return NextResponse.next();
}

// MATCHER
export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|appletouchicon.png|/app/favicon.ico|pages/api/|images|studio|opengraph-image|robots.txt|sitemap.xml).*)"], 
}



