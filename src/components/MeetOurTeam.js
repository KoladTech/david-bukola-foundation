import PictureCard from "@/components/PictureCard";
import ContentCard from "@/components/ContentCard";
import { fetchedData } from "@/firebase/fetchFirebaseData";
import { useEffect, useState } from "react";
import { mediaBaseUrl } from "@/constants";

export default function MeetOurTeam() {
  // variables to store and set states for data and errors asynchronously
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects on component mount (Using a variable to store the function)
  useEffect(() => {
    const loadTeam = async () => {
      try {
        setLoading(true);
        // Get the fetched data
        const team = await fetchedData("Team");

        // Set the fetched data
        setTeam(team);

        // log error if failed
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <section className="py-4 px-4 my-4 bg-gray-50 items-center justify-center text-center">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-semibold mb-4 text-center">
                Meet Our Team
              </h2>
              <h3 className="text-xl mb-12 text-center text-gray-600">
                The Team Powering Our Vision and Making a Difference
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 mb-8">
                {/* Team cards */}
                {team
                  .filter((member) => member.display)
                  .map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                      <div className=" flex items-center justify-center w-64 h-64 rounded-lg shadow-lg overflow-hidden">
                        <PictureCard
                          imageSrc={`${mediaBaseUrl}${member.image}`}
                          altText=""
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <ContentCard
                          title={member.firstName + " " + member.lastName}
                          content={member.role}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
