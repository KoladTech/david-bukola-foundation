import { clsx } from "clsx";
// `clsx` is a utility to conditionally join classNames together.
import { twMerge } from "tailwind-merge";
// `tailwind-merge` is used to merge Tailwind CSS classes, resolving conflicts.

export function cn(...inputs) {
  // Combines multiple classNames into one string, handling conflicts with `twMerge`.
  return twMerge(clsx(inputs));
}

export function formatTimestamp(
  timestamp,
  fallback = "No Timestamp Available"
  // Default fallback value if the timestamp is missing or invalid.
) {
  if (!timestamp) {
    return fallback;
    // Return the fallback if no timestamp is provided.
  }

  try {
    // Convert the Firestore timestamp (in seconds) to a JavaScript Date object.
    const date = new Date(timestamp.seconds * 1000);
    return new Intl.DateTimeFormat("en-US", {
      month: "long", // Display the full month name.
      day: "numeric", // Display the day of the month as a number.
      year: "numeric", // Display the full year.
    }).format(date);
    // Format the date into a human-readable string.
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    // Log any errors for debugging purposes.
    return fallback;
    // Return the fallback value if an error occurs.
  }
}

export function formatCurrency(amount, currency = "NGN") {
  // Format a numeric amount into a currency string in British Pounds (GBP).
  return new Intl.NumberFormat("en-NG", {
    style: "currency", // Specify the style as currency.
    currency: currency, // Use the provided currency format, and default to NGN, if non is provided.
    minimumFractionDigits: 0, // Exclude fractional digits.
    maximumFractionDigits: 0, // Ensure no more than 0 fractional digits.
  }).format(amount);
  // Return the formatted currency string.
}

export const formatKey = (key) => {
  // Format a camelCase or PascalCase string into a human-readable format.
  return (
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Insert a space before each capital letter.
      .replace(/^[a-z]/, (char) => char.toUpperCase())
  );
  // Capitalize the first character of the string.
};
