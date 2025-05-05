"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";

const LangSwitcher = ({locale}: {locale: string} ) => {
   
    
    const targetLanguage = locale === 'es' ? 'en' : 'es';
    const pathname = usePathname()
    const redirectTarget = () => {
        if (!pathname) return '/'
        const segments = pathname.split('/')
        segments[1] = targetLanguage;
        return segments.join('/')
    }

    return (    
        <Link
            className="font-semibold flex items-center gap-1 text-gray-900 hover:text-red-500 dark:text-gray-400"
            href={redirectTarget()}
            locale={targetLanguage}>
            <span>{targetLanguage === 'es' ? '🇺🇸' : '🇵🇦'}</span>
            {locale.toLocaleUpperCase()}
        </Link>
    );
};

export default LangSwitcher;