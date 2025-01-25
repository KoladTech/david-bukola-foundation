"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "@/lib/firebase/firebaseConfig";

const ApiStatsContext = createContext();

export const ApiStatsProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [loading_stats, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsDoc = await getDoc(
          doc(db, "Site Statistics", "jZGeXcoSIbk6pGTNXlln")
        );
        if (statsDoc.exists()) {
          setStats(statsDoc.data());
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
    <ApiStatsContext.Provider value={{ stats, loading_stats, error }}>
      {children}
    </ApiStatsContext.Provider>
  );
};

export const useApiData = () => useContext(ApiStatsContext);
