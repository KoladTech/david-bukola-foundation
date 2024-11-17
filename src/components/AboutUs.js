import { ArrowRight, ArrowRightToLineIcon } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h2 className="text-4xl font-bold mb-6">
        <span className="font-semibold">∆</span>bout Us
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed font-bold">
        At the DavidBukola Foundation, our mission is simple yet powerful:
        Transforming lives, Empowering hope. We strive to alleviate poverty and
        inspire hope for a brighter tomorrow...
      </p>
      <Link
        href="/about"
        className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-1.5 rounded-full hover:bg-blue-600 transition-colors"
      >
        Learn More
        <ArrowRightToLineIcon className="w-4 h-4" />
      </Link>
    </section>
  );
}
