"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "@/firebase/firebaseConfig";

const ApiBankDetailsContext = createContext();

export const ApiBankDetailsProvider = ({ children }) => {
  const [bankDetails, setBankDetails] = useState(null);
  const [loading_bankDetails, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchData = async () => {
      setLoading(true);
      try {
        const bankDetailsDoc = await getDoc(
          doc(db, "FoundationInfo", "X4Z4PkcNt2C0L1mFUXdj")
        );
        if (bankDetailsDoc.exists()) {
          console.log("Exists");
          setBankDetails(bankDetailsDoc.data());
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiBankDetailsContext.Provider
      value={{ bankDetails, loading_bankDetails, error }}
    >
      {children}
    </ApiBankDetailsContext.Provider>
  );
};

// export const useApiData = () => useContext(ApiBankDetailsContext);
export const useApiData = () => {
  // debugging
  const context = useContext(ApiBankDetailsContext);
  if (!context) {
    throw new Error("useApiData must be used within an ApiBankDetailsProvider");
  }

  // Provide default value for `bankDetails`
  const { bankDetails = {}, loading_bankDetails, error } = context;
  return { bankDetails, loading_bankDetails, error };
};
