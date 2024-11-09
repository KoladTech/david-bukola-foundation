import Image from "next/image";
import AchievementWidgets from "./AchievementWidgets";
// import AchievementWidget from "@/components/Achievement";

export default function Achievement() {
  return (
    <div className="relative">
      <Image
        src="/achievement-image.png"
        alt="achievement image"
        width={1376}
        height={553}
        className="w-full h-auto"
      />
      <div className="absolute bottom-8 right-8">
        <AchievementWidgets />
      </div>
    </div>
  );
}
