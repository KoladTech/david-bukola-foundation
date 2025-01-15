"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoPlayer({ src, poster, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState(poster);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!poster) {
      const videoElement = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      videoElement.src = src;
      videoElement.preload = "metadata";

      videoElement.addEventListener("loadeddata", () => {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        videoElement.currentTime = 1; // Extract a frame at 1 second
      });
      videoElement.addEventListener("seeked", () => {
        try {
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg");
          setGeneratedPoster(dataUrl);
        } catch (error) {
          console.error("Error generating poster:", error);
        }
      });
      return () => {
        videoElement.removeEventListener("loadeddata", () => {});
        videoElement.removeEventListener("seeked", () => {});
      };
    }
  }, [poster, src]);

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
        controls
        ref={videoRef}
        src={src}
        poster={generatedPoster}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onError={(e) => console.error("Video playback error", e)}
        aria-label={"Video testimonial"}
        loading="lazy"
        preload="metadata"
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
