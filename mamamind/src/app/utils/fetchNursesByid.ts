import { Nurse } from './types';

export const fetchNurseById = async (id: number): Promise<Nurse> => {
  try {
    const response = await fetch(`/api/getnursebyid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch nurse with ID ${id}. Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json() as Nurse;
    console.log('Fetched nurse data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching nurse data:', (error as Error).message || error);
    throw new Error('Failed to fetch nurse data');
  }
};
