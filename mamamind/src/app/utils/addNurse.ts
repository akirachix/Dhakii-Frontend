import { Nurse as NurseType } from "./types";

const addNurseUrl = "/api/addNurse";

export const addNurse = async (data: NurseType): Promise<NurseType> => {
  if (
    !data.firstname ||
    !data.lastname ||
    !data.email ||
    !data.sub_location ||
    !data.phone_number ||
    !data.gender ||
    !data.reg_no ||
    !data.hospital ||
    !data.username
  ) {
    throw new Error("All fields are required to add a nurse.");
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

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response:", errorResponse);
      const errorMessage = errorResponse?.error || response.statusText;
      throw new Error(
        `Failed to add nurse. Status: ${response.status} - ${errorMessage}`
      );
    }

    const newNurse = (await response.json()) as NurseType;
    console.log("Added nurse data:", newNurse);
    return newNurse;
  } catch (error) {
    console.error("Error adding nurse data:", (error as Error).message || error);
    throw new Error("Failed to add nurse");
  }
};
