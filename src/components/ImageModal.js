import Image from "next/image";
import { X } from "lucide-react";

export default function ImageModal({ src, alt, onClose }) {
  return (
    // Full screen image modal
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Image section */}
      <div className="relative max-w-3xl max-h-[90vh] w-full h-full">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
