import Link from "next/link";
import Image from "next/image";

export default function PictureCard({ imageSrc, title, content }) {
  return (
    <>
      {/* Right Side - Image  */}
      <div className="w-full md:w-1/2 justify-center items-center bg-white">
        <Image
          src={imageSrc} // Path to your image
          alt="Left Side Image"
          width={500} // Adjust width and height as needed
          height={500}
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
}
