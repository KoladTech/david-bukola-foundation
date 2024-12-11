import db from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { z } from "zod";

// Data to be gotten from the database
const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

// Function to fetch available projects.
export async function fetchProjects() {
  try {
    // Get the collection and documents from db
    const projectsCollection = collection(db, "Projects");
    const snapshot = await getDocs(projectsCollection);

    // // Debugging
    // snapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // Maps the received document data from firestore into an array of js objects
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    //   validate the data received from database
    // return projects.forEach((project) => projectSchema.parse(project));
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}
