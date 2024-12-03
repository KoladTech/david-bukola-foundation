"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoPlayer({ src, poster, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onError={(e) => console.error("Video playback error", e)}
      />
      <Button
        size="icon"
        variant="secondary"
        className="absolute inset-0 m-auto w-16 h-16 rounded-full"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="h-8 w-8" />
        ) : (
          <Play className="h-8 w-8" />
        )}
        <span className="sr-only">
          {isPlaying ? "Pause video" : "Play video"}
        </span>
      </Button>
    </div>
  );
}
