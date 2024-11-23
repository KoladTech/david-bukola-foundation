import Image from "next/image";

export default function PictureCard({ imageSrc, altText }) {
  return (
    <>
      {/* Right Side - Image  */}
      <div className="relative w-full h-full justify-center items-center">
        <Image
          src={imageSrc} // Path to your image
          alt={altText}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
}
