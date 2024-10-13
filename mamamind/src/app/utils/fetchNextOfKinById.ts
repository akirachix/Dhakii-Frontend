// Import necessary types
import { NextOfKin as NextOfKinType } from './types'; 

const baseURL = '/api/nextOfKin/';

export const fetchNextOfKinByMotherId = async (motherId: number): Promise<NextOfKinType[]> => {
  try {
    // Fetch all next of kin data from the backend
    const response = await fetch(`${baseURL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch next of kin. Status: ${response.status} - ${response.statusText}`);
    }

    // Parse the response as NextOfKinType[]
    const kinData = await response.json() as NextOfKinType[];
    console.log('Fetched all next of kin data:', kinData);
    
    // Filter the next of kin by motherId on the client side
    const filteredKinData = kinData.filter(kin => kin.mother_id === motherId);
    console.log('Filtered next of kin data:', filteredKinData);

    return filteredKinData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching next of kin data:', error.message);
      throw error;
    } else {
      console.error('An unknown error occurred:', error);
      throw new Error('An unknown error occurred');
    }
  }
};