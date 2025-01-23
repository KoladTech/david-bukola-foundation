"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function VideoPlayer({ src, poster, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [generatedPoster, setGeneratedPoster] = useState(poster);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

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

  useEffect(() => {
    const video = videoRef.current;
    const setAudioData = () => {
      setDuration(video.duration);
      setCurrentTime(video.currentTime);
    };

    const setVideoProgress = () => {
      const newProgress = (video.currentTime / video.duration) * 100;
      setProgress(newProgress);
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("loadedmetadata", setAudioData);
    video.addEventListener("timeupdate", setVideoProgress);

    return () => {
      video.removeEventListener("loadedmetadata", setAudioData);
      video.removeEventListener("timeupdate", setVideoProgress);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume) => {
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleProgressChange = (newProgress) => {
    const newTime = (videoRef.current.duration * newProgress[0]) / 100;
    videoRef.current.currentTime = newTime;
    setProgress(newProgress[0]);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipBackward = () => {
    videoRef.current.currentTime -= 10;
  };

  const skipForward = () => {
    videoRef.current.currentTime += 10;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div
      ref={playerRef}
      className={cn("relative group", className)}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={generatedPoster}
        className="w-full h-full"
        style={{
          objectFit: isFullscreen ? "contain" : "cover", // Use "contain" in fullscreen mode
          objectPosition: "center",
        }}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label="Video player"
        loading="lazy"
        preload="metadata"
      />
      {showControls && (
        <>
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                className="p-1 w-6 h-6"
                variant="secondary"
                onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
              >
                {volume > 0 ? (
                  <Volume2 className="h-2 w-2" />
                ) : (
                  <VolumeX className="h-2 w-2" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                onValueChange={(newVolume) =>
                  handleVolumeChange(newVolume[0] / 100)
                }
                className="w-24"
              />
            </div>
            <Button
              size="icon"
              className="p-1 w-6 h-6"
              variant="secondary"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize className="h-2 w-2" />
              ) : (
                <Maximize className="h-2 w-2" />
              )}
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="w-full mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  className="p-1 w-6 h-6"
                  variant="secondary"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-2 w-2" />
                  ) : (
                    <Play className="h-2 w-2" />
                  )}
                </Button>
                <Button
                  size="icon"
                  className="p-1 w-6 h-6"
                  variant="secondary"
                  onClick={skipBackward}
                >
                  <SkipBack className="h-2 w-2" />
                </Button>
                <Button
                  size="icon"
                  className="p-1 w-6 h-6"
                  variant="secondary"
                  onClick={skipForward}
                >
                  <SkipForward className="h-2 w-2" />
                </Button>
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
