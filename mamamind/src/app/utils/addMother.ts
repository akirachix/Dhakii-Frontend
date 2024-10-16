

import { Mother } from "./types";

export const addMother = async (data: Mother): Promise<Mother> => {
  try {
    const response = await fetch('/api/addmother', { // Proxy to the Next.js route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add mother. Status: ${response.status} - ${errorText}`);
    }

    const newMother: Mother = await response.json(); // Expecting the response from the backend API
    console.log('Added mother data:', newMother);
    
    // Ensure the backend returned a valid mother with an ID
    if (!newMother.id) {
      throw new Error('The server did not return a valid mother ID');
    }

    return newMother; // Return the mother object with ID
  } catch (error: unknown) {
    console.error('Error adding mother:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred while adding mother.');
    }
  }
};
