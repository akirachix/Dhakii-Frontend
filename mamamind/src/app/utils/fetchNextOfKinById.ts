// 
import { NextOfKin as NextOfKinType } from './types'; 

const baseURL = '/api/nextOfKin/';

export const fetchNextOfKinById = async (id: number): Promise<NextOfKinType> => {
  try {
    const response = await fetch(`${baseURL}${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch next of kin. Status: ${response.status} - ${response.statusText}`);
    }

    const kinData = await response.json() as NextOfKinType;
    console.log('Fetched next of kin data:', kinData);
    
    return kinData;
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
