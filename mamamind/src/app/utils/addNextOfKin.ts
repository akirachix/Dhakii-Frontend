
import { NextOfKin } from "./types";

export const addNextOfKin = async (data: NextOfKin): Promise<NextOfKin> => {
  try {
    if (!data.first_name || !data.last_name || !data.relationship || !data.phone_number || !data.mother_id) {
      throw new Error('All fields are required to add a next of kin.');
    }

    const response = await fetch('/api/addnextofkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(`Failed to add next of kin. Status: ${response.status} - ${errorResponse.error || response.statusText}`);
    }

    const newNextOfKin: NextOfKin = await response.json();
    console.log('Added next of kin data:', newNextOfKin);
    return newNextOfKin;
  } catch (error: unknown) { 
    if (error instanceof Error) {
      console.error('Error adding next of kin data:', error.message);
    } else {
      console.error('Error adding next of kin data:', 'An unknown error occurred');
    }
    throw error; 
  }
};
