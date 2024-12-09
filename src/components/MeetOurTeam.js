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
    id: 3,
    name: "Omotayo Kolawole",
    role: "Co-founder",
    image: "/images/CO-founder-image.jpg",
  },
];

export default function MeetOurTeam() {
  return (
    <section className="py-4 px-4 my-4 items-center justify-center text-center">
      <h2 className="text-4xl font-semibold mb-2 text-center">Meet Our Team</h2>
      <h3 className="">The Team Powering Our Vision and Making a Difference</h3>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 p-8 m-4">
        {/* Team cards */}
        {teamMembers.map((member) => (
          <div className="flex flex-col items-center justify-center">
            <div key={member.id}>
              <div className=" flex w-72 h-72 mb-4 overflow-hidden">
                <PictureCard imageSrc={member.image} altText="" />
              </div>
              <div className="flex items-center justify-center">
                <ContentCard title={member.name} content={member.role} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
