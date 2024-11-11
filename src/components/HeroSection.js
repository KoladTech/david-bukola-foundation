import Link from "next/link";
import Image from "next/image";

export default function HeroSection({ title, description, imageUrl, alt }) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="relative rounded-3xl overflow-hidden mb-12 h-[300px] md:h-[600px]">
        <div className="aspect-w-2 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
          <Image
            src={imageUrl}
            alt={alt}
            className="w-full h-full"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <p className="text-sm mb-2">Want to make an impact?</p>
          <Link
            href="/donate"
            className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block text-sm hover:bg-blue-600 transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </>
  );
}
