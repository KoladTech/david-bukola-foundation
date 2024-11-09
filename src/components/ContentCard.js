import Link from "next/link";
import Image from "next/image";

export default function ContentCard({ imageSrc, title, content }) {
  return (
    <>
      {/* Left Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-4 bg-white ">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </>
  );
}
