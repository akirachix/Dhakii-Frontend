

import { Mother } from "./types";

export const addMother = async (data: Mother): Promise<Mother> => {
  if (
    !data.first_name ||
    !data.last_name ||
    !data.date_of_birth ||
    !data.tel_no ||
    !data.marital_status ||
    data.no_of_children === undefined ||
    !data.village ||
    !data.sub_location
  ) {
    throw new Error('All fields are required to add a mother.');
  }

  console.log('Sending mother data:', data);

  try {
    const response = await fetch('/api/addmother', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to add mother. Status: ${response.status} - ${response.statusText}`);
    }

    const newMother: Mother = await response.json();
    console.log('Added mother data:', newMother);
    return newMother;
  } catch (error: unknown) { 
    console.error('Error adding mother data:', error);
    
    if (error instanceof Error) {
      throw new Error(error.message); 
    } else {
      throw new Error('An unknown error occurred while adding mother.'); 
    }
  }
};
