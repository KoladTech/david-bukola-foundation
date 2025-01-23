import Image from "next/image";

export default function PictureCard({ imageSrc, altText, imageSizes }) {
  return (
    <>
      {/* Right Side - Image  */}
      <div className="relative w-full h-full justify-center items-center">
        <Image
          src={imageSrc} // Path to your image
          alt={altText} // Images alt text
          fill
          sizes={imageSizes}
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
}
