import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(
  timestamp,
  fallback = "No Timestamp Available"
) {
  if (!timestamp) {
    return fallback;
  }

  try {
    const date = new Date(timestamp.seconds * 1000);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return fallback;
  }
}
