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
export default function middleware (request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale 
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request) || i18n.defaultLocale; // fallback

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        )
    }
}

// MATCHER
export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|/app/favicon.ico|pages/api/|images|studio|opengraph-image|robots.txt|sitemap.ts).*)"], 
}



