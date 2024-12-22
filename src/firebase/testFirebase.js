// addData.js
import { z } from "zod";
import db from "./firebaseConfig.js";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import { signInWithEmailAndPassword } from "firebase/auth";

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
// createUser({
//   firstName: "Moyo",
//   lastName: "Kolawole",
//   email: "moyo@gmail.com",
//   age: 25,
//   roles: ["team_member", "volunteer"],
// });

const data = [
  {
    category: "Sponsored Giveaway",
    title: "Pilot 1 Million Giveaway",
    description:
      "In collaboration with JusGiveaway, an online gaming platform, our foundation sponsored a giveaway to provide financial relief to struggling Nigerians. As a part of our mission to help alleviate poverty, the giveaway was designed to support people all over the country facing financial challenges, offering direct cash assistance. The innovative JusGiveaway platform was instrumental in turning this idea into a reality, combining the thrill of gaming with this meaningful cause.",
    details: {
      totalFinancialSupport: "₦1,000,000",
      beneficiaries: 33,
      date: "2024-10-27",
      collaborator: "JusGiveaway",
    },
  },
  {
    category: "Sponsored Giveaway",
    title: "TPain Reliever Giveaway",
    description:
      "For a second time, our foundation decided to partner with the online gaming platform, JusGiveaway, to provide financial assistance, turning entertainment into empowerment. The giveaway was designed to be a game-changing support for Nigerians in need and was open for anyone interested to participate in. Gamers played a heads-or-tails flip game and the winners received cash prizes distributed via direct bank transfer to their bank accounts.",
    details: {
      totalFinancialSupport: "₦500,000",
      beneficiaries: 16,
      date: "2024-11-29",
      collaborator: "JusGiveaway",
    },
  },
  {
    category: "School Fees Sponsorship",
    title:
      "Empowering Futures: School Fees Sponsored by DavidBukola Foundation",
    description:
      "At DavidBukola DevelopmentFoundation, we believe education is the foundation for a better future. Through our school fees sponsorship program, we've empowered multiple students at crucial times, helping them pursue their dreams and build a brighter tomorrow, not being limited by financial constraints.",
    details: {
      totalStudentsSupported: 12,
      totalFeesPaid: "₦456,500",
      schoolsBenefited: 9,
      location: "Kaduna",
      timeline: "2024-04 to 2024-11",
      schools: [
        "Cherith Schools",
        "Kids dwelling nursery and primary school",
        "Jinie School",
        "Ivy Schools and Educational Services",
        "Christ Ambassadors Intl College",
        "Demonstration School LTD",
        "Priestly Intl School",
      ],
    },
  },
  {
    category: "Orphanage Visits",
    title: "Spreading Smiles: Touching Lives at Local Orphanages",
    description:
      "As a part of our mission to provide compassionate support to orphans, we have visited several orphanages to share love and essential supplies. During these visits, we provided foodstuffs, ensuring the children have access to nutritious meals.",
    details: {
      orphanagesVisited: 3,
      location: "Kaduna",
      supportGiven: ["Rice", "Indomie", "Capri-Sun", "Spaghetti"],
    },
  },
];

// Function to upload data to Firestore

// Add achievements to Firestore
data.forEach(async (achievement, index) => {
  try {
    const docRef = doc(db, "Achievements", `Achievement-${index + 1}`);
    await setDoc(docRef, achievement);
    console.log(`Achievement ${index + 1} added successfully.`);
  } catch (error) {
    console.error(`Error adding achievement ${index + 1}:`, error);
  }
});
