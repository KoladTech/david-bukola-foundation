import PictureCard from "@/components/PictureCard";
import ContentCard from "@/components/ContentCard";

const teamMembers = [
  {
    id: 1,
    name: "Demi Fasanya",
    role: "Co-founder, CEO",
    image: "/images/Demi-CEO-image.png",
  },
  {
    id: 2,
    name: "Mayowa Kolawole",
    role: "Head of Operations",
    image: "/images/Mayowa-HOP-image.png",
  },
  {
    id: 3,
    name: "David Wambebe",
    role: "Head Consultant",
    image: "/images/Head-Consultant-image.png",
  },
  {
    id: 4,
    name: "Omotayo Kolawole",
    role: "Co-founder",
    image: "/images/CO-founder-image.jpg",
  },
];

export default function MeetOurTeam() {
  return (
    <section className="py-4 px-4 my-4 bg-gray-50 items-center justify-center text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Meet Our Team
        </h2>
        <h3 className="text-xl mb-12 text-center text-gray-600">
          The Team Powering Our Vision and Making a Difference
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-8 mb-8">
          {/* Team cards */}
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <div className=" flex items-center justify-center w-64 h-64 rounded-lg shadow-lg overflow-hidden">
                <PictureCard imageSrc={member.image} altText="" />
              </div>
              <div className="flex items-center justify-center">
                <ContentCard title={member.name} content={member.role} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
