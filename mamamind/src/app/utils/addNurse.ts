import { Nurse as NurseType } from "./types";

const addNurseUrl = "/api/addNurse";

export const addNurse = async (data: NurseType): Promise<NurseType> => {
  const requiredFields = [
    'firstname', 
    'lastname', 
    'email', 
    'sub_location', 
    'phone_number', 
    'gender', 
    'reg_no', 
    'hospital', 
    'username'
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Field '${field}' is required to add a nurse.`);
    }
  }

  console.log("Sending nurse data:", data);

  try {
    const response = await fetch(addNurseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle response
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response:", errorResponse);
      const errorMessage = errorResponse?.error || response.statusText;
      throw new Error(`Failed to add nurse. Status: ${response.status} - ${errorMessage}`);
    }

    const newNurse = await response.json() as NurseType;
    console.log("Added nurse data:", newNurse);
    return newNurse;
  } catch (error) {
    console.error("Error adding nurse data:", (error as Error).message || error);
    throw new Error("Failed to add nurse");
  }
};
