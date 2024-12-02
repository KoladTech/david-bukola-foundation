import Image from "next/image";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const cards = [
  {
    id: 1,
    title: "Card 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit fringilla sem eget rutrum. Interdum et malesuada fames ac  Quisque vehicula viverra risus quis iaculis.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
  {
    id: 2,
    title: "Card 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit fringilla sem eget rutrum. Interdum et malesuada fames ac  Quisque vehicula viverra risus quis iaculis.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
  {
    id: 3,
    title: "Card 3",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis libero quis  suscipit vitae ante eu, scelerisque hendrerit ipsum.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
  {
    id: 4,
    title: "Card 4",
    content:
      "Praesent a cursus sapien, id dictum magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.  efficitur. Fusce lacinia urna sodales vehicula suscipit.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
  {
    id: 5,
    title: "Card 5",
    content:
      "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut consequat sapien ut sapien vehicula fermentum. Maecenas  nec sem tincidunt, at feugiat leo porta. Morbi et accumsan nulla, eu auctor dui.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
];

export default function ScrollableCardRow() {
  return (
    <section className="py-12 px-4">
      <div className="flex flex-col md:flex-row">
        {/* Default Section */}
        <div className="flex flex-col p-4 text-center md:text-start">
          <h2 className="text-2xl font-bold mb-6 ">Testimonies</h2>
          <Link href="/testimonials" className="flex-1">
            <p>"Hear what people are saying about our foundation."</p>
          </Link>
          <div className="flex flex-row justify-center md:justify-start my-4 py-4 gap-4">
            <FaArrowCircleLeft className="text-5xl text-blue-500" />
            <FaArrowCircleRight className="text-5xl text-blue-500" />
          </div>
        </div>

        {/* Each card section */}
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 max-w-sm w-full md:w-96 md:h-96 bg-white rounded-lg shadow-md p-4 flex flex-col snap-center"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <Image
                  src={card.imageSrc}
                  alt={`${card.title} image`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <p className="text-gray-600 flex-grow">{card.content}</p>
              <p className="text-gray-600 flex-grow">{card.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
