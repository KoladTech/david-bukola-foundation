"use client";

import React from "react";
import { fetchedData } from "@/firebase/fetchFirebaseData";
import { useState, useEffect } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  Target,
  Building2,
  Gift,
} from "lucide-react";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import Image from "next/image";
import Link from "next/link";
import { formatTimestamp, formatCurrency } from "@/lib/utils";
import ImageModal from "@/components/ImageModal";

export default function Page() {
  // variables to store and set states for data and errors asynchronously
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects on component mount (Using a variable to store the function)
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Get the fetched data
        const fetchedEvents = await fetchedData("Events");

        // Set the fetched data
        setEvents(fetchedEvents);

        // log error if failed
      } catch (err) {
        setError("Failed to load events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "past");

  function EventCard({ event, isImageFirst = false }) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-14">
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className={`relative aspect-[4/5] md:aspect-auto md:${
              isImageFirst ? "order-2" : ""
            }`}
            onClick={() => setSelectedImage(`${event.image}`)}
          >
            <Image
              src={event.image}
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

            {event.eventLink && (
              <Link
                href={event.eventLink}
                className="inline-flex items-center justify-center w-full px-6 py-3 mt-auto text-white font-medium bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
              >
                {event.eventsType === "giveaway"
                  ? "Join Giveaway"
                  : "Learn More"}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <HeroSection
          imageUrl={`/images/events_hero_section.jpg`}
          title={`Events`}
        />
        <div className="flex flex-col space-y-10 mb-8">
          <div>
            <ContentCard
              content={
                "At DavidBukola Development Foundation, we believe in the power of community and shared purpose. Our events are designed to bring people together, raise awareness, and make a lasting impact on the causes we support, each event playing a vital role in driving positive change."
              }
            />
            <ContentCard
              content={
                "Join us as we work hand in hand to build a brighter future. Explore our upcoming events, and discover how you can be part of our mission to make a difference. Together, we can transform lives!"
              }
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="m-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-12 mb-20">
            {/* Upcoming Events Section */}
            <h1 className="text-4xl md:text-5xl font-bold mb-14 text-center">
              Upcoming Events
            </h1>
            <p className=" text-center text-2xl mb-14">
              More events coming soon!
            </p>

            {upcomingEvents.length > 0 && (
              <section>
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
            )}

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
              <section>
                {/* <h2 className="text-3xl font-bold mb-8">Past Events</h2> */}
                <h1 className="text-4xl md:text-5xl font-bold mb-14 text-center">
                  Past Events
                </h1>

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
      )}
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Full-screen image"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
