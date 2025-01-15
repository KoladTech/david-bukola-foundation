import { LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";

export default function AchievementWidgets() {
  return (
    // {View AchievementWidgets button}
    <>
      <div className="absolute bottom-6 right-6 md:right-7 bg-white p-1 md:p-1 rounded-xl shadow-lg">
        <Link
          href="/achievements"
          className="inline-flex bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium p-2 rounded-xl transition-colors"
        >
          View Achievements
          <LuArrowUpRight className="w-4 h-4 ml-1 mt-1" />
        </Link>
      </div>
    </>

    // Achievement counts section...
  );
}
