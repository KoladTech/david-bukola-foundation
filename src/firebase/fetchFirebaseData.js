import db from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { z } from "zod";

// Define a generic schema to validate data dynamically
export async function fetchedData(collectionName, schema = null) {
  try {
    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    // Get the collection and documents from Firestore
    const targetCollection = collection(db, collectionName);
    const snapshot = await getDocs(targetCollection);

    // Map Firestore data to an array of objects
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Validate the data using the provided schema, if available
    if (schema) {
      return data.map((item) => schema.parse(item));
    }

    return data; // Return data object as it is if no schema is provided
  } catch (error) {
    console.error(
      `Error fetching data from collection '${collectionName}':`,
      error
    );
    throw new Error("Failed to fetch data");
  }
}
