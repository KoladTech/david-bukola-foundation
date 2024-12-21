"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  Target,
  Building2,
  Gift,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";

const events = [
  {
    title: "Spreading Holiday Cheer: Christmas Food Drive 2024",
    description:
      "This holiday season, DavidBukola Development Foundation is hosting a Christmas food drive to benefit orphaned children. Together, we aim to ensure these orphans get to share in the love and joy of the season and enjoy a tasty, nutritious meal. We hope to make this season a joyful and memorable one for them. Every meal provided not only nourishes the body but also brings hope and joy to children who deserve to feel loved and cared for this season.",
    location: {
      venue: "Shema Filling Station, Yakowa Way",
      city: "Kaduna",
      state: "Kaduna State",
      country: "Nigeria",
    },
    plannedStartDate: "2024-12-24T00:00:00.000Z",
    beneficiaries: ["Orphans from"],
    goal: "Provide 100 meals to orphans for Christmas",
    collaborators: ["Kay's Takeout", "another restaurant"],
    financialSupport: null,
    giftsWorth: null,
    eventType: "food_drive",
    status: "upcoming",
    image: "/images/food_drive_poster.png",
  },
  {
    title: "Fada Krismas Giveaway",
    description:
      "This Christmas, DavidBukola Development Foundation is once again teaming up with JusGiveaway, to bring you the ultimate holiday giveaway \"Fada Krismas\"! In the spirit of giving, we're offering exciting prizes, including cash rewards to brighten your holidays and thoughtful gifts to make your celebrations extra special. Join us in the festive spirit and be part of this holiday season of surprises and cheer. Don't miss the chance to win- participate in this special giveaway and make this Christmas one to remember! Experience the magic of Fada Krismas with DavidBukola Foundation and JusGiveaway!",
    location: null,
    plannedStartDate: "2024-12-22T00:00:00.000Z",
    beneficiaries: null,
    goal: null,
    collaborators: ["JusGiveaway"],
    financialSupport: 1000000,
    giftsWorth: 500000,
    eventType: "giveaway",
    status: "upcoming",
    image: "/images/christmas_giveaway_image.png",
  },
];

function EventCard({ event, isImageFirst = false }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-14">
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className={`relative aspect-[4/5] md:aspect-auto ${
            isImageFirst ? "order-2" : ""
          }`}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="transition-transform hover:scale-105"
          />
        </div>
        <div
          className={`p-6 flex flex-col gap-4 ${isImageFirst ? "order-1" : ""}`}
        >
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            <span className="text-gray-600">
              {formatDate(event.plannedStartDate)}
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

          <Link
            href={`/events/${event.eventType}/${event.title
              .toLowerCase()
              .replace(/ /g, "-")}`}
            className="inline-flex items-center justify-center w-full px-6 py-3 mt-auto text-white font-medium bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            {event.eventType === "giveaway" ? "Join Giveaway" : "Learn More"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "past");

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Upcoming Events
          </h1>

          {/* Upcoming Events Section */}
          <section className="mb-20">
            {/* <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2> */}
            <div className="space-y-8">
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  isImageFirst={index % 2 === 0}
                />
              ))}
            </div>
          </section>

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Past Events</h2>
              <div className="space-y-8">
                {pastEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    isImageFirst={index % 2 === 0}
                  />
                ))}
              </div>
            </section>
          )}

          {/* No Events Message */}
          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No events scheduled at this time. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
