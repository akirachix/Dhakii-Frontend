import { Hospital } from '../types/hospital';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Fetch hospitals from the API
export const fetchHospitals = async (): Promise<Hospital[]> => {
  const response = await fetch(`${baseURL}/api/hospitals/`);
  if (!response.ok) {
    throw new Error('Failed to fetch hospitals');
  }
  return response.json();
};

// Add a new hospital to the API
export const addHospital = async (hospitalData: Partial<Hospital>): Promise<Hospital> => {
  const response = await fetch(`${baseURL}/api/hospitals/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hospitalData),
  });

  if (!response.ok) {
    throw new Error('Failed to add hospital');
  }

  return response.json();
};
