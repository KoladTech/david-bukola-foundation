import db from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { z } from "zod";
<<<<<<< HEAD
=======
// import { firebaseApp } from "./firebase"; // Import your Firebase initialization

// const db = getFirestore(firebaseApp);
>>>>>>> origin/project-page-backend

// Data to be gotten from the database
const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

// Function to fetch available projects.
export async function fetchProjects() {
  try {
<<<<<<< HEAD
    // Get the collection and documents from db
=======
>>>>>>> origin/project-page-backend
    const projectsCollection = collection(db, "Projects");
    const snapshot = await getDocs(projectsCollection);

    // Debugging
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

<<<<<<< HEAD
    // Maps the received document data from firestore into an array of js objects
=======
>>>>>>> origin/project-page-backend
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

<<<<<<< HEAD
=======
    console.log(projects);
>>>>>>> origin/project-page-backend
    //   validate the data received from database
    // return projects.forEach((project) => projectSchema.parse(project));
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
<<<<<<< HEAD
=======
    // throw new Error("Failed to fetch project");
>>>>>>> origin/project-page-backend
  }
}
