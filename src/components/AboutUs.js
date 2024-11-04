import { ArrowRight, ArrowRightToLineIcon } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="max-ux-2xl mx-auto px-4 py-12 text-center">
      <h2 className="text-4xl font-bold mb-6">
        <span className="font-light">∆</span>bout Us
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra
        porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed
        eu amet purus. Diam aliquet enim lectus et aliquam eu.
      </p>
      <Link
        href="/about"
        className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        View Page
        <ArrowRightToLineIcon className="w-4 h-4" />
      </Link>
    </section>
  );
}
