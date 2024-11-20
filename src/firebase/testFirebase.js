// addData.js
import { z } from "zod";
import db from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

const UserRole = z.enum(["admin", "team_member", "volunteer"]);

const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  address: z.string().optional(),
  roles: z
    .array(UserRole)
    .refine((roles) => new Set(roles).size === roles.length, {
      message: "Roles must be unique",
    }), //a user may actually have multiple roles, so we should address this later
  isActive: z.boolean().default(true),
  state: z.string().optional(),
  country: z.string().optional(),
  profilePictureUrl: z.string().optional(),
  donationHistory: z.array(z.string()).optional(),
  volunteerProjects: z.array(z.string()).optional(),
  createdAt: z.date().default(new Date()),
});

// Function to create a user
async function createUser(userData) {
  try {
    // Validate the user data
    const validatedUser = UserSchema.parse(userData);

    // Add user to the "users" collection
    const docRef = await addDoc(collection(db, "Users"), validatedUser);

    console.log("User added with ID:", docRef.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error adding document:", error);
    }
  }
}

// Example usage: Creating a user
createUser({
  firstName: "Moyo",
  lastName: "Kolawole",
  email: "moyo@gmail.com",
  age: 25,
  roles: ["team_member", "volunteer"],
});
