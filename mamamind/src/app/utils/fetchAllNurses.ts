// utils/fetchAllNurses.ts
import { Nurse as NurseType } from "./types";

const fetchNursesUrl = "https://mamamind-db02af72f48f.herokuapp.com/api/nurses/";

export const fetchNurses = async (page: number = 1, itemsPerPage: number = 10): Promise<{ nurses: NurseType[], totalPages: number }> => {
  try {
    const response = await fetch(`${fetchNursesUrl}?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch nurses. Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    console.log("API Response:", data);

    if (!Array.isArray(data)) {
      throw new Error("Invalid API response: expected an array of nurses.");
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return {
      nurses: data.slice((page - 1) * itemsPerPage, page * itemsPerPage), 
      totalPages, 
    };
  } catch (error) {
    console.error("Error fetching nurses data:", (error as Error).message || error);
    throw new Error("Failed to fetch nurses");
  }
};
