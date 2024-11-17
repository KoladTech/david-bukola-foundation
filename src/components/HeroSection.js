import Link from "next/link";
import Image from "next/image";

export default function HeroSection({
  title,
  title2,
  description,
  imageUrl,
  alt,
  showStats = false,
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between md:items-end my-4 space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold">
          {title}
          <span className="block">{title2}</span>
        </h1>
        <p className="text-gray-600 md:whitespace-nowrap">{description}</p>
      </div>
      <div className="relative rounded-3xl overflow-hidden mb-12 h-[300px] md:h-[533px]">
        <div className="aspect-w-2 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
          <Image
            src={imageUrl}
            alt={alt}
            className="w-full h-full"
            fill={true}
            style={{ objectFit: "cover" }}
          />
          {showStats && (
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="text-white mb-8">
                <div className="text-6xl font-bold mb-2">1,000+</div>
                <div className="text-2xl">People Reached</div>
              </div>
              <div className="flex justify-start gap-8 text-white">
                <div>
                  <div className="text-5xl font-bold mb-2">10+</div>
                  <div className="text-xl">Schools Reached</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">20+</div>
                  <div className="text-xl">States Reached</div>
                </div>
              </div>
            </div>
          )}
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
