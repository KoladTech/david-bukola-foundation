import Image from "next/image";
// import AchievementWidget from "@/components/Achievement";

export default function Achievement() {
  return (
    <div>
      <Image
        src="/achievement-image.png"
        alt="achievement image"
        width={1376}
        height={553}
        className="w-full h-auto"
      />
      {/* <div> */}
      {/* <AchievementWidget /> */}
      {/* </div> */}
    </div>
  );
}
