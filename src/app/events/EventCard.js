"use client";
import {
  CalendarDays,
  MapPin,
  Users,
  Target,
  Building2,
  Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatTimestamp, formatCurrency } from "@/lib/utils";
import { mediaBaseUrl } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function EventCard({
  event,
  isImageFirst = false,
  onImageClick,
  onVolunteer,
}) {
  const router = useRouter();

  const donateToEvent = () => {
    const queryString = new URLSearchParams(eventData).toString();
    router.push(`/donate?${queryString}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-14">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Changes order of appearance for event images (Left or right) */}
        <div
          className={`relative aspect-[4/5] md:aspect-auto md:${
            isImageFirst ? "order-2" : ""
          }`}
          onClick={() => onImageClick(`${mediaBaseUrl}${event.image}`)} //Sets image to full screen
        >
          <Image
            src={`${mediaBaseUrl}${event.image}`}
            alt={event.title}
            fill
            style={{ objectFit: "contain" }}
            className="transition-transform hover:scale-105"
          />
        </div>
        <div
          className={`p-6 flex flex-col gap-4 md:${
            isImageFirst ? "order-1" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            <span className="text-gray-600">
              {formatTimestamp(event.plannedStartDate)}
            </span>
          </div>

          <h3 className="text-2xl font-bold">{event.title}</h3>
          <p className="text-gray-600">{event.description}</p>

          {event.location && (
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">{event.location.venue}</p>
                <p className="text-gray-600">{`${event.location.city}, ${event.location.state}`}</p>
              </div>
            </div>
          )}

          {event.beneficiaries && (
            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
              <div>
                <p className="font-medium">Beneficiaries</p>
                <p className="text-gray-600">
                  {event.beneficiaries.join(", ")}
                </p>
              </div>
            </div>
          )}

          {event.goal && (
            <div className="flex items-start gap-2">
              <Target className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
              <div>
                <p className="font-medium">Goal</p>
                <p className="text-gray-600">{event.goal}</p>
              </div>
            </div>
          )}

          {event.collaborators && (
            <div className="flex items-start gap-2">
              <Building2 className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
              <div>
                <p className="font-medium">Collaborators</p>
                <p className="text-gray-600">
                  {event.collaborators.join(", ")}
                </p>
              </div>
            </div>
          )}

          {(event.financialSupport || event.giftsWorth) && (
            <div className="flex items-start gap-2">
              <Gift className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
              <div>
                <p className="font-medium">Prizes</p>
                {event.financialSupport && (
                  <p className="text-gray-600">
                    Cash: {formatCurrency(event.financialSupport)}
                  </p>
                )}
                {event.giftsWorth && (
                  <p className="text-gray-600">
                    Gifts worth: {formatCurrency(event.giftsWorth)}
                  </p>
                )}
              </div>
            </div>
          )}

          {event.eventLink && event.status === "upcoming" && (
            <Link
              href={event.eventLink}
              className="inline-flex items-center justify-center w-full px-6 py-3 mt-auto text-white font-medium bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              {event.eventsType === "giveaway" ? "Join Giveaway" : "Learn More"}
            </Link>
          )}
          <div className="flex gap-4 mt-4">
            {/* if the event requires volunteers */}
            {event.canVolunteer && event.status === "upcoming" && (
              <Button
                onClick={() => {
                  onVolunteer(event); //displays event volunteer form
                }}
                className="inline-flex items-center justify-center px-6 py-3 mt-auto text-white font-medium bg-blue-500 hover:bg-blue-400 transition-colors"
              >
                Volunteer
              </Button>
            )}
            {/* if the event requires donations */}
            {event.canDonate && event.status === "upcoming" && (
              <Button
                onClick={donateToEvent}
                className="inline-flex items-center justify-center px-6 py-3 mt-auto text-white font-medium bg-blue-500 hover:bg-blue-400 transition-colors"
              >
                Donate
              </Button>
            )}
            {/* past events can be viewed in achievements */}
            {event.status === "past" && (
              <Button className="inline-flex items-center justify-center px-6 py-3 mt-auto text-white font-medium bg-blue-500 hover:bg-blue-400 transition-colors">
                <Link href={`/achievements#${event.id}`}>
                  View Details in Achievements
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
