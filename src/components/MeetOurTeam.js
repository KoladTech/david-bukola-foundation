import Image from "next/image";

export default function MeetOurTeam() {
  const teamMembers = [
    {
      name: "David Bukola",
      role: "Head of Operations",
      image: "/person placeholder.png",
    },
    {
      name: "David Bukola",
      role: "Head of Operations",
      image: "/person placeholder.png",
    },
    {
      name: "David Bukola",
      role: "Head of Operations",
      image: "/person placeholder.png",
    },
    {
      name: "David Bukola",
      role: "Head of Operations",
      image: "/person placeholder.png",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra
        porttitor nulla ornare.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={300}
              className="rounded-lg mb-4 w-full"
            />
            <h3 className="font-bold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
