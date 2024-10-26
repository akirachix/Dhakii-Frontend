

import { useState, useEffect } from 'react';
import { fetchPrevalenceData } from '../utils/fetchPrevalence';
import { Mother } from '../types/mothers'; // Import the existing Mother interface

interface PrevalenceData {
  village: any;
  ageGroup: any;
  mother: Mother | null;
  total_score: number;
}

export const usePpdPrevalence = () => {
  const [data, setData] = useState<PrevalenceData[]>([]);
  const [ppdMothers, setPpdMothers] = useState<PrevalenceData[]>([]);
  const [villageCounts, setVillageCounts] = useState<Record<string, number>>({});
  const [ageGroups, setAgeGroups] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { combinedData, villageCounts, ageGroupCounts } = await fetchPrevalenceData();
        setData(combinedData);

        // Filter mothers with PPD (score > 10)
        const mothersWithPpd = combinedData.filter((item) => item.total_score > 10);
        setPpdMothers(mothersWithPpd);

        // Set village counts
        setVillageCounts(villageCounts);

        // Set age group counts
        setAgeGroups(ageGroupCounts);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`An error occurred while fetching data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, ppdMothers, villageCounts, ageGroups, loading, error };
};


// import { useEffect, useState } from "react";
// import { Mother } from "@/app/types/mothers";
// import { getMothersStatistics } from "@/app/utils/motherStatistics";

// export const usePpdPrevalence = () => {
//   const [data, setData] = useState<Mother[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchMothersData = async () => {
//     try {
//       const response = await fetch('/api/mothers'); // API endpoint to fetch mothers
//       const json = await response.json();
//       setData(json);
//     } catch (err) {
//       setError("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMothersData();
//   }, []);

//   const ppdMothers = data.filter((mother) => mother.total_score > 10);

//   const { villageCounts, ageGroups } = getMothersStatistics(ppdMothers);

//   return { ppdMothers, villageCounts, ageGroups, data, loading, error };
// };
