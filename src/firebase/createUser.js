import { z } from "zod";
import db from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// /**
//  * Adds a new document to the "users" collection in Firestore.
//  * @param {Object} data - The form data containing user information.
//  * @returns {Promise<Object>} - The added document reference or an error message.
//  */

const addUserDocument = async (data) => {
  // Ensure required fields are present
  const { firstName, lastName, email, newsletter, roles } = data;
  if (!firstName || !lastName || !email || newsletter === undefined) {
    throw new Error(
      "Missing required fields: firstName, lastName, email, or newsletter."
    );
  }

  const usersCollectionRef = collection(db, "Users"); //Get the Users collection

  try {
    //Create a userData here to add a timestamp for when the document was created
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      newsletter: newsletter,
      roles: roles,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(usersCollectionRef, userData); // Add the doc asynchronously
    return docRef; // Return the added document reference
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to add document to Firestore.");
  }
};

export default addUserDocument;
