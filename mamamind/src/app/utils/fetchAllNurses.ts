// // utils/fetchAllNurses.ts
// import { Nurse as NurseType } from "./types";

// const fetchNursesUrl = "https://mamamind-db02af72f48f.herokuapp.com/api/nurses/";

// export const fetchNurses = async (page: number = 1, itemsPerPage: number = 10): Promise<{ nurses: NurseType[], totalPages: number }> => {
//   try {
//     const response = await fetch(`${fetchNursesUrl}?page=${page}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch nurses. Status: ${response.status} - ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Log the API response to see its structure
//     console.log("API Response:", data);

//     // Since the API returns an array directly, use data instead of data.nurses
//     if (!Array.isArray(data)) {
//       throw new Error("Invalid API response: expected an array of nurses.");
//     }

//     // Compute totalPages based on the number of items and itemsPerPage
//     const totalPages = Math.ceil(data.length / itemsPerPage);

//     return {
//       nurses: data.slice((page - 1) * itemsPerPage, page * itemsPerPage), // Paginate the array locally
//       totalPages, // Manually calculate totalPages based on the array size
//     };
//   } catch (error) {
//     console.error("Error fetching nurses data:", (error as Error).message || error);
//     throw new Error("Failed to fetch nurses");
//   }
// };


import { Nurse as NurseType } from "./types";

const fetchNursesUrl = "https://mamamind-db02af72f48f.herokuapp.com/api/nurses/";

export const fetchNurses = async (
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{ nurses: NurseType[]; totalPages: number }> => {
  try {
    const response = await fetch(`${fetchNursesUrl}?page=${page}&itemsPerPage=${itemsPerPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch nurses. Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Log the API response to verify the structure
    console.log("API Response:", data);

    // Assuming the API response contains a list of nurses and total count of items
    const { results, count } = data; // Adjust according to actual API response structure

    // Calculate total pages based on count and itemsPerPage
    const totalPages = Math.ceil(count / itemsPerPage);

    return {
      nurses: results, // Use the results from the API response
      totalPages, // Use the calculated totalPages
    };
  } catch (error) {
    console.error("Error fetching nurses data:", (error as Error).message || error);
    throw new Error("Failed to fetch nurses");
  }
};

