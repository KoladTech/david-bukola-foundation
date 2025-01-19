"use client";
import { mediaBaseUrl } from "@/constants";
import React from "react";
import { fetchedData } from "@/firebase/fetchFirebaseData";
import { useState, useEffect, useRef } from "react";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import ImageModal from "@/components/ImageModal";
import EventCard from "./EventCard";
import VolunteerForm from "./VolunteerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  // variables to store and set states for data and errors asynchronously
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [volunteerEvent, setVolunteerEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events on component mount (Using a variable to store the function)
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

  const formRef = useRef(null);
  // To close form on clicking outside the form
  useEffect(() => {
    function handleClickOutside(event) {
      // Close form on clicking anywhere not the form
      if (formRef.current && !formRef.current.contains(event.target)) {
        setVolunteerEvent(null);
      }
    }

    // Add event listener for clicks outside the form
    if (volunteerEvent) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Cleanup event listener on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [volunteerEvent]);

  // Separate events into either Upcoming or Pasts
  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "past");

  return (
    <>
      <div className="mb-14">
        <HeroSection
          imageUrl={`${mediaBaseUrl}/images/events_hero_section.jpg`}
          title={`Events`}
        />
      </div>
      <div className="">
        <div className="flex flex-col space-y-10 mb-8 p-4">
          <div className="mb-8 content-div">
            <p className="text-lg text-gray-600 mx-auto">
              At DavidBukola Development Foundation, we believe in the power of
              community and shared purpose. Our events are designed to bring
              people together, raise awareness, and make a lasting impact on the
              causes we support, each event playing a vital role in driving
              positive change.
            </p>
            <br />
            <p className="text-lg text-gray-600 mx-auto">
              Join us as we work hand in hand to build a brighter future.
              Explore our upcoming events, and discover how you can be part of
              our mission to make a difference. Together, we can transform
              lives!
            </p>
            {/* <ContentCard
              content={
                "At DavidBukola Development Foundation, we believe in the power of community and shared purpose. Our events are designed to bring people together, raise awareness, and make a lasting impact on the causes we support, each event playing a vital role in driving positive change."
              }
            />
            <ContentCard
              content={
                "Join us as we work hand in hand to build a brighter future. Explore our upcoming events, and discover how you can be part of our mission to make a difference. Together, we can transform lives!"
              }
            /> */}
          </div>
        </div>
        {loading ? (
          <div className="m-10">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="bg-gray-50">
            {/* // <div className=""> */}
            <div className="container mx-auto px-4 py-12 mb-20 content-div p-4">
              {/* TODO: More events ish */}
              {/* Upcoming Events Section */}
              {/* <h1 className="text-4xl md:text-5xl font-bold mb-14 text-center">
                Upcoming Events
              </h1>
              <p className=" text-center text-2xl mb-14">
                More events coming soon!
              </p> */}
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming" className="text-lg">
                    Upcoming Events
                  </TabsTrigger>
                  <TabsTrigger value="past" className="text-lg">
                    Past Events
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  {upcomingEvents.length > 0 ? (
                    <section>
                      {/* <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2> */}
                      <div className="space-y-8">
                        {upcomingEvents.map((event, index) => (
                          <EventCard
                            key={index}
                            event={event}
                            isImageFirst={index % 2 === 0}
                            onImageClick={setSelectedImage} // Shows the image full screen
                            onVolunteer={setVolunteerEvent} // Displays Volunteer form
                          />
                        ))}
                      </div>
                    </section>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-xl text-gray-600 mb-32">
                        No events scheduled at this time. Check back soon!
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="past">
                  {pastEvents.length > 0 ? (
                    <section>
                      <div className="space-y-8">
                        {pastEvents.map((event, index) => (
                          <EventCard
                            key={index}
                            event={event}
                            isImageFirst={index % 2 === 0} // Swaps Poster display
                            onImageClick={setSelectedImage} // Shows the image full screen
                            onVolunteer={setVolunteerEvent} // Displays Volunteer form
                          />
                        ))}
                      </div>
                    </section>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-xl text-gray-600">
                        No events have been concluded at this time. Check back
                        soon!
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
        {/* Modal to display image full screen */}
        {selectedImage && (
          <ImageModal
            src={selectedImage}
            alt="Full-screen image"
            onClose={() => setSelectedImage(null)}
          />
        )}
        {/* Display Volunteer form */}
        {volunteerEvent && (
          <VolunteerForm
            closeForm={formRef}
            event={volunteerEvent}
            thankYou={setShowThankYou}
            onClose={() => setVolunteerEvent(null)} // Close volunteer form
          />
        )}
        {/* Thank you message */}
        {showThankYou && (
          <ThankYouMessageOnFormSuccess
            showThankYou={showThankYou}
            // Sends a function to set show thank you back to false)
            closeThankYou={() => {
              setShowThankYou(false);
            }}
            message={"Thank you for volunteering!"}
            extraMessage={"Your support helps us make a difference."}
          />
        )}
      </div>
    </>
  );
}
