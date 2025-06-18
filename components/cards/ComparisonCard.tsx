import Link from "next/link"
import { cx } from "@/utils/all";

const colorMap: Record<string, string> = {
  blue: 'bg-blue-800',
  red: 'bg-red-800',
  green: 'bg-green-800',
  yellow: 'bg-yellow-800',
  teal: 'bg-teal-800',
  orange: 'bg-orange-800',
  // add more as needed
};

const textMap: Record<string, string> = {
  blue: 'text-blue-800',
  red: 'text-red-800',
  green: 'text-green-800',
  yellow: 'text-yellow-800',
  teal: 'text-teal-800',
  orange: 'text-orange-800',
  black: 'text-black',
  // add more as needed
};

export default function ComparisonCard({ title, category, color = 'blue', textColor = 'black', link }:
  { title?: string, category?: string, color?: string, textColor?: string, link?: string }) {

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500">
      <Link href={link || "/"}>
        <div className="flex items-center space-x-4">
          {/* Vertical colored line */}
          <div
            className={cx(
              'h-10 w-1.5 rounded-full',
              colorMap[color] || 'bg-blue-500'
            )}
          ></div>


          <div className="text-left">
            <h3 className="text-sm font-semibold dark:text-black text-gray-600">{category}</h3>
            <p className={cx('text-lg font-bold dark:text-black',
              textMap[textColor] || 'text-black')}>{title}</p>
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