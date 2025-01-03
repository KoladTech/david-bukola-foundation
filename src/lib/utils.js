import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { NAIRA_SYMBOL } from "@/constants";

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

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const formatKey = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
    .replace(/^[a-z]/, (char) => char.toUpperCase()); // Capitalize the first letter
};
