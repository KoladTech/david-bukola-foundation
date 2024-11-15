// import Image from "next/image";

// export default function MeetOurTeam() {
//   const teamMembers = [
//     {
//       name: "David Bukola",
//       role: "Head of Operations",
//       image: "/person placeholder.png",
//     },
//     {
//       name: "David Bukola",
//       role: "Head of Operations",
//       image: "/person placeholder.png",
//     },
//     {
//       name: "David Bukola",
//       role: "Head of Operations",
//       image: "/person placeholder.png",
//     },
//     {
//       name: "David Bukola",
//       role: "Head of Operations",
//       image: "/person placeholder.png",
//     },
//   ];

//   return (
//     <section className="container mx-auto px-4 py-16">
//       <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
//       <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
//         Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra
//         porttitor nulla ornare.
//       </p>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {teamMembers.map((member, index) => (
//           <div key={index} className="text-center">
//             <Image
//               src={member.image}
//               alt={member.name}
//               width={300}
//               height={300}
//               className="rounded-lg mb-4 w-full"
//             />
//             <h3 className="font-bold">{member.name}</h3>
//             <p className="text-gray-600">{member.role}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import PictureCard from "../components/PictureCard";
import ContentCard from "../components/ContentCard";

export default function MeetOurTeam() {
  return (
    <section className="py-4 px-4 my-4 items-center justify-center text-center">
      <h2 className="text-4xl font-semibold mb-2 text-center">Meet Our Team</h2>
      <h3 className="">The Team Powering Our Vision and Making a Difference</h3>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 m-4">
        {/* Team cards */}
        <div className="flex flex-col items-center">
          <div className=" relative w-64 h-64 mb-4 overflow-hidden">
            <PictureCard imageSrc="/person placeholder.png" altText="" />
          </div>
          <div>
            <ContentCard title="Demi Fasanya" content="CEO" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 rounded-full mb-4 overflow-hidden">
            <PictureCard imageSrc="/person placeholder.png" altText="" />
          </div>
          <div>
            <ContentCard title="Mayowa Kolawole" content="Head Of Operations" />
          </div>
        </div>

        {/* <div className="flex flex-col items-center">
              <PictureCard imageSrc="/person placeholder.png" altText="" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div> */}
        {/* <div className="flex flex-col items-center">
        
        <PictureCard imageSrc="/meet-the-team-4.png" altText="" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div> */}
      </div>
    </section>
  );
}
