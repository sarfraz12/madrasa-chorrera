import Link from "next/link"
import { cx } from "@/utils/all";


export default function ComparisonCard({ title, category, color='bg-blue-500', textColor='text-black', link }:
  { title?: string, category?: string, color?: string, textColor?: string, link?: string }) {

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500">
      <Link href={link || "/"}>
        <div className="flex items-center space-x-4">
          {/* Vertical colored line */}
          <div className={cx('h-10 w-1.5',color ? color : "bg-teal-500",'rounded-full')}></div>

          <div className="text-left">
            <h3 className="text-sm font-semibold dark:text-black text-gray-600">{category}</h3>
            <p className={cx('text-lg font-bold dark:text-black',
               textColor ? textColor : "text-blue-500")}>{title}</p>
          </div>
        </div>
      </Link>
      <Link href={link || "/"}>
        <div className="text-blue-600 text-lg font-medium">
          &rarr;
        </div>
      </Link>

    </div>
  );
}