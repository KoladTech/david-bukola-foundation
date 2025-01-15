import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function ThankYouMessageOnFormSuccess({
  showThankYou,
  closeThankYou,
  message,
  extraMessage,
}) {
  useEffect(() => {
    if (showThankYou) {
      // Set a timeout for thank you message
      const timeout = setTimeout(() => {
        closeThankYou(); // Close the thank you message
      }, 3000);

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [showThankYou, closeThankYou]);

  if (!showThankYou) {
    return null; // Don't render anything if the message isn't visible
  }

  return (
    // White background to fill the screen
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
      {/* Thank You Card */}
      <Card className="relative bg-white rounded-lg p-8 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
        <div className=" bg-sky-500 rounded-lg p-6 w-full max-w-md shadow-lg text-center">
          {/* Main Thank You Message */}
          <h2 className="text-2xl font-semibold text-gray-900">{message}</h2>
          {/* Extra Message */}
          <p className="text-gray-700">{extraMessage}</p>
        </div>
      </Card>
    </div>
  );
}
