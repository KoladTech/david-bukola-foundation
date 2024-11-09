import Image from "next/image";
import AchievementWidgets from "./AchievementWidgets";
// import AchievementWidget from "@/components/Achievement";

export default function Achievement() {
  return (
    <div className="relative">
      <Image
        src="/achievements-image.png"
        alt="achievement image"
        width={1376}
        height={553}
        className="w-full h-auto"
      />
      <div className="relative bottom-8 right-8">
        <AchievementWidgets />
      </div>
    </div>
  );
}
