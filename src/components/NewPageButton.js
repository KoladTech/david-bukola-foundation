import { LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";

export default function NewPageButton({
  href = "",
  className = "",
  buttonText,
}) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center gap-2 px-6 py-3 
        bg-[#0095FF] hover:bg-[#0077CC] 
        text-white font-medium rounded-full 
        transition-colors duration-200
        ${className}
      `}
    >
      {buttonText}
      <LuArrowUpRight className="w-4 h-4" />
    </Link>
  );
}
