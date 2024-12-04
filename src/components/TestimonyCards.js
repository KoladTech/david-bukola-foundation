// import Image from "next/image";
// import Link from "next/link";
// import { FaArrowCircleLeft } from "react-icons/fa";
// import { FaArrowCircleRight } from "react-icons/fa";
// import { ArrowRight, ArrowUpRight } from "lucide-react";

// const cards = [
//   {
//     id: 1,
//     title: "Card 1",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit fringilla sem eget rutrum. Interdum et malesuada fames ac  Quisque vehicula viverra risus quis iaculis.",
//     imageSrc:  ,
//     name: "Name",
//   },
//   {
//     id: 2,
//     title: "Card 2",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit fringilla sem eget rutrum. Interdum et malesuada fames ac  Quisque vehicula viverra risus quis iaculis.",
//     imageSrc: "/person placeholder.png",
//     name: "Name",
//   },
//   {
//     id: 3,
//     title: "Card 3",
//     content:
//       "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis libero quis  suscipit vitae ante eu, scelerisque hendrerit ipsum.",
//     imageSrc: "/person placeholder.png",
//     name: "Name",
//   },
// ];

// export default function ScrollableCardRow() {
//   return (
//     <section className="py-12 px-4">
//       <div className="flex flex-col md:flex-row">
//         {/* Default Testimonies Section */}
//         <div className="flex flex-col p-4 text-center md:text-start">
//           <h2 className="text-2xl font-bold mb-6 ">Testimonies</h2>
//           <p className="mb-6">
//             "Hear what people are saying about our foundation."
//           </p>

//           {/* View Testimonials page button */}
//           <div className="flex justify-center md:justify-start">
//             <Link href="/testimonials" className="">
//               <button className="inline-flex items-center gap-2 px-4 max-w-full bg-blue-500 text-white rounded-md py-2 w-full hover:bg-blue-600 transition-colors">
//                 View Page
//                 <ArrowUpRight className="w-4 h-4" />
//               </button>
//             </Link>
//           </div>
//           {/* <div className="flex flex-row justify-center md:justify-start my-4 py-4 gap-4">
//             <FaArrowCircleLeft className="text-5xl text-blue-500" />
//             <FaArrowCircleRight className="text-5xl text-blue-500" />
//           </div> */}
//         </div>

//         {/* Each card section */}
//         <div className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className="flex-shrink-0 max-w-sm w-full md:w-96 md:h-96 bg-white rounded-lg shadow-md p-4 flex flex-col snap-center"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-lg font-semibold">{card.title}</h3>
//                 <Image
//                   src={card.imageSrc}
//                   alt={`${card.title} image`}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                 />
//               </div>
//               <p className="text-gray-600 flex-grow">{card.content}</p>
//               <p className="text-gray-600 flex-grow">{card.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Incredible Impact",
    content:
      "The foundation's work has truly transformed our community. Their dedication to improving lives is inspiring.",
    imageSrc: "/person placeholder.png",
    name: "John Doe",
    role: "Community Leader",
  },
  {
    id: 2,
    title: "Life-Changing Support",
    content:
      "Thanks to their support, I was able to pursue my education. They've opened doors I never thought possible.",
    imageSrc: "/person placeholder.png",
    name: "Jane Smith",
    role: "Student",
  },
  {
    id: 3,
    title: "Exceptional Volunteers",
    content:
      "Working with this foundation has been a rewarding experience. Their volunteers are passionate and committed.",
    imageSrc: "/person placeholder.png",
    name: "Alice Johnson",
    role: "Volunteer Coordinator",
  },
  {
    id: 4,
    title: "Transparent Operations",
    content:
      "As a donor, I appreciate their transparency. It's clear that every contribution is used effectively to create change.",
    imageSrc: "/person placeholder.png",
    name: "Bob Williams",
    role: "Regular Donor",
  },
  {
    id: 5,
    title: "Innovative Approach",
    content:
      "Their innovative programs address root causes, not just symptoms. It's a fresh approach to community development.",
    imageSrc: "/person placeholder.png",
    name: "Eva Brown",
    role: "Social Worker",
  },
];

export default function ScrollableCardRow() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScrollEvent = () => {
        setScrollPosition(container.scrollLeft);
      };
      container.addEventListener("scroll", handleScrollEvent);
      return () => container.removeEventListener("scroll", handleScrollEvent);
    }
  }, []);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Static Testimonies Section */}
          <div className="w-full md:w-1/2 flex flex-col p-4 text-center ">
            <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
            <div className="justify-start md:text-start mb-6">
              <p className="mb-6 text-lg text-gray-600">
                Hear what people are saying about our foundation!
              </p>
              <div>
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  View All Testimonials
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="justify-end md:text-end">
              <p className="mb-6 text-lg text-gray-600">
                Would you like to share yours?
              </p>
              <div>
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Share your Testimony
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Scrollable Cards Section */}
          <div className="w-full md:w-1/2 relative">
            <div
              ref={containerRef}
              className="flex overflow-x-auto gap-6 pb-6 scrollbar-custom"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md p-6"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={card.imageSrc}
                      alt={`${card.name}'s profile picture`}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{card.name}</h3>
                      <p className="text-gray-600">{card.role}</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
                  <p className="text-gray-700">{card.content}</p>
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <button
                onClick={() => handleScroll("left")}
                className="p-2 bg-slate-200 rounded-full shadow-md hover:bg-slate-300 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <button
                onClick={() => handleScroll("right")}
                className="p-2 bg-slate-200 rounded-full shadow-md hover:bg-slate-300 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
