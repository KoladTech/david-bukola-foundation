import Image from "next/image";

export default function PictureCard({ imageSrc, altText }) {
  return (
    <>
      {/* Right Side - Image  */}
      <div className="w-full justify-center items-center">
        <Image
          src={imageSrc} // Path to your image
          alt={altText}
          width={400} // Adjust width and height as needed
          height={400}
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
}
