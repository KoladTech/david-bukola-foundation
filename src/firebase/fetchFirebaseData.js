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
export async function fetchedData(collectionData) {
  try {
    // Get the collection and documents from db
    // const projectsCollection = collection(db, "Projects");
    const projectsCollection = collection(db, `${collectionData}`);
    const snapshot = await getDocs(projectsCollection);

    // Debugging
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

export async function fetchDocumentData(yourCollection) {
  try {
    // Fetch achievements and site stats concurrently
    const documentSnapshot = await getDocs(
      // const achievementsSnapshot = await getDocs(.................................1 (delete)
      // Get the collection
      collection(db, yourCollection)
      // collection(db, "Achievements")............................................2 (delete)
    );

    // Process the data neede
    // const achievementsData = achievementsSnapshot.docs.map((doc) => ({...........3 (delete)
    const yourFetchedData = documentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // setAchievements(achievementsData);...........................................4
    return yourFetchedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    // setLoading(false);............................................................5
  }

  // fetchData();.......................................................................6
  // fetchDocumentData();
}
