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
        inspire hope for a brighter tomorrow. Our work includes providing
        educational scholarships to children from low-income families, ensuring
        that every child has a chance to learn and grow. We are also passionate
        about providing education in technology to young, aspiring individuals
        with an interest in the field, equipping them with the skills needed for
        a successful future. Additionally, we extend compassionate support to
        widows and individuals in crisis, helping them find stability and
        renewed hope for the future.
      </p>
      <Link
        href="/about"
        className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        View Page
        <ArrowRightToLineIcon className="w-4 h-4" />
      </Link>
    </section>
  );
}
