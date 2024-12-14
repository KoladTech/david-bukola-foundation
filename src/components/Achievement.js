import Image from "next/image";
import AchievementWidgets from "./AchievementWidgets";
import NewPageButton from "./NewPageButton";
// import AchievementWidget from "@/components/Achievement";

export default function Achievement() {
  return (
    <div className="relative rounded-lg">
      <Image
        src="/images/achievements-image.png"
        alt="achievement image"
        width={1376}
        height={600}
        className="w-full h-auto rounded-3xl"
      />
      <div className="absolute bottom-6 right-6 md:right-7">
        <AchievementWidgets />
        {/* <NewPageButton buttonText={"View Achievements"} /> */}
      </div>
    </div>
  );
}
