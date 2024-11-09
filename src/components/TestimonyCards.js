import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Testimonies",
    content: "Hear what people are saying about our foundation.",
  },
  {
    id: 2,
    title: "Card 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit fringilla sem eget rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque aliquam turpis ut sapien ultricies, sit amet semper justo tincidunt. Quisque vehicula viverra risus quis iaculis.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
  {
    id: 3,
    title: "Card 3",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis libero quis nisl condimentum interdum. Donec tincidunt tincidunt justo, pharetra tempor nulla rutrum hendrerit. Maecenas lorem odio, suscipit vitae ante eu, scelerisque hendrerit ipsum.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
  {
    id: 4,
    title: "Card 4",
    content:
      "Praesent a cursus sapien, id dictum magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce purus justo, venenatis vel posuere a, tempus vitae odio. Phasellus sodales lorem sed erat vestibulum efficitur. Fusce lacinia urna sodales vehicula suscipit.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
  {
    id: 5,
    title: "Card 5",
    content:
      "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut consequat sapien ut sapien vehicula fermentum. Maecenas ac sem vehicula, rutrum eros eget, molestie ipsum. Curabitur et lorem enim. Nulla luctus lectus nec sem tincidunt, at feugiat leo porta. Morbi et accumsan nulla, eu auctor dui.",
    imageSrc: "/symbol.svg",
    name: "Name",
  },
];

export default function ScrollableCardRow() {
  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Testimonies</h2>
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-64 h-64 bg-white rounded-lg shadow-md p-4 flex flex-col snap-start"
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
    </section>
  );
}
