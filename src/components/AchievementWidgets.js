import { LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";

export default function AchievementWidgets() {
  return (
    // {View AchievementWidgets button}
    <>
      <Link
        href="/achievements"
        className="w-fit inline-flex bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-2 py-2 rounded-xl transition-colors"
      >
        View Achievements
        <LuArrowUpRight className="w-4 h-4" />
      </Link>
    </>

    // Achievement counts section...
  );
}
