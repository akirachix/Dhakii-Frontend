import { Nurse } from "@/app/utils/types";
const fetchNursesUrl = "https://mamamind-db02af72f48f.herokuapp.com/api/nurses/";

export const fetchNurses = async (page: number = 1): Promise<{ nurses: Nurse[], totalPages: number }> => {
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

    // Log the response to check if `results` exists
    console.log("API Response:", data);

    // Ensure `data.results` exists and is an array
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid API response structure: expected `results` to be an array");
    }

    // Ensure the data structure matches the frontend's expectations
    return {
      nurses: data.results.map((nurse: any) => ({
        firstname: nurse.firstname || "Unknown",
        lastname: nurse.lastname || "Unknown",
        sub_location: nurse.sub_location || "",
        reg_no: nurse.reg_no || "",
      })),  // Safeguard for missing fields
      totalPages: data.total_pages || 1,  // Ensure the totalPages is returned from the API
    };
  } catch (error: any) {
    console.error("Error fetching nurses data:", error.message || error);
    throw new Error("Failed to fetch nurses");
  }
};
