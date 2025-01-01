"use client";

import React from "react";
import { fetchedData } from "@/firebase/fetchFirebaseData";
import { useState, useEffect } from "react";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import ImageModal from "@/components/ImageModal";
import EventCard from "./EventCard";

export default function Page() {
  // variables to store and set states for data and errors asynchronously
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
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
                      onImageClick={setSelectedImage}
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
