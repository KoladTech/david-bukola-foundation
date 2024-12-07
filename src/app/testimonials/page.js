import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, MessageSquarePlus, VideoIcon } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import VideoPlayer from "@/components/VideoPlayer";
import UnderConstruction from "@/components/UnderConstruction";

const testimonials = [
  {
    id: 1,
    name: "Vincent Anderson",
    role: "Student volunteer",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.",
    image: "/person placeholder.png?height=400&width=400",
    type: "text",
  },
  {
    id: 2,
    name: "Michael Hamilton",
    role: "Partner University of Lagos",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.",
    image: "/person placeholder.png",
    type: "text",
  },
  {
    id: 3,
    name: "Vincent Anderson",
    role: "Student volunteer",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.",
    image: "/person placeholder.png",
    type: "text",
  },
  {
    id: 4,
    name: "Vincent Anderson",
    role: "Student volunteer",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis. ",
    image: "/person placeholder.png",
    type: "text",
  },
  {
    id: 5,
    name: "Deyemi Akande",
    role: "Partner University of Lagos",
    image: "",
    type: "video",
    videoUrl: "/vid.mp4",
  },
  {
    id: 6,
    name: "Deyemi Akande",
    role: "Partner University of Lagos",
    image: "",
    type: "video",
    videoUrl: "/vid2.mp4",
  },
  {
    id: 7,
    name: "Deyemi Akande",
    role: "Partner University of Lagos",
    image: "",
    type: "video",
    videoUrl: "vid3.mp4",
  },
];

export default function TestimonialsPage() {
  return (
    <UnderConstruction />
    // <div className="container mx-auto px-4 py-8 my-8">
    //   {/* Featured Video Section */}

    //   {/* Featured Video Section */}
    //   <div className="mb-6 rounded-lg overflow-hidden">
    //     <VideoPlayer
    //       src="/videoTest.mp4"
    //       poster="/thumbnail.jpg?height=600&width=1200"
    //       className="w-full aspect-video"
    //     />
    //   </div>

    //   {/* <HeroSection
    //     title={"Testimonials"}
    //     imageUrl={"/main_about_us.jpg"}
    //     alt={"Featured testimonial video thumbnail"}
    //     video={true}
    //   /> */}

    //   {/* Add Testimony Buttons */}
    //   <div className="flex flex-wrap gap-4 mb-8">
    //     <Button
    //       variant="outline"
    //       className="flex items-center gap-2 rounded-3xl"
    //     >
    //       <MessageSquarePlus className="h-4 w-4" />
    //       Add Text Testimony
    //     </Button>
    //     <Button
    //       variant="outline"
    //       className="flex items-center gap-2 rounded-3xl"
    //     >
    //       <VideoIcon className="h-4 w-4" />
    //       Add Video Testimony
    //     </Button>
    //   </div>

    //   {/* Text Testimonials Grid */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    //     {testimonials
    //       .filter((testimonial) => testimonial.type === "text")
    //       .map((testimonial, index) => (
    //         <Card
    //           key={testimonial.id}
    //           className={`p-6 h-80 ${
    //             index % 2 === 1 ? "bg-blue-500 text-white" : ""
    //           }`}
    //         >
    //           <div className="flex items-start gap-4">
    //             <Image
    //               src={testimonial.image}
    //               alt={`${testimonial.name}'s profile picture`}
    //               width={48}
    //               height={48}
    //               className="rounded-full"
    //             />
    //             <div>
    //               <h3 className="font-semibold">{testimonial.name}</h3>
    //               <p
    //                 className={`text-sm ${
    //                   index % 2 === 1 ? "text-blue-100" : "text-gray-500"
    //                 } mb-2`}
    //               >
    //                 {testimonial.role}
    //               </p>
    //               <p className="text-sm">{testimonial.content}</p>
    //             </div>
    //           </div>
    //         </Card>
    //       ))}
    //   </div>

    //   {/* Video Testimonials Grid */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {testimonials
    //       .filter((testimonial) => testimonial.type === "video")
    //       .map((testimonial) => (
    //         <div
    //           key={testimonial.id}
    //           className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
    //         >
    //           <VideoPlayer
    //             src={testimonial.videoUrl}
    //             poster={testimonial.image}
    //             className="w-full h-full"
    //           />
    //           {/* <Image
    //             src={testimonial.image}
    //             alt={`${testimonial.name}'s video thumbnail`}
    //             fill
    //             className="object-cover"
    //           />
    //           <div className="absolute inset-0 flex items-center justify-center">
    //             <Button
    //               size="icon"
    //               variant="secondary"
    //               className="rounded-full w-12 h-12"
    //             >
    //               <Play className="h-6 w-6" />
    //               <span className="sr-only">Play video testimonial</span>
    //             </Button>
    //           </div> */}
    //           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
    //             <h3 className="font-semibold">{testimonial.name}</h3>
    //             <p className="text-sm text-gray-200">{testimonial.role}</p>
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </div>
  );
}
