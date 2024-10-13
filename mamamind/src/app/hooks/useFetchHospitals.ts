import { useState, useEffect } from 'react';
import { fetchHospitals } from '@/app/utils/hospitalTypes'; 

export interface Hospital {
  id: number;
  name: string;
  village: string;
  hospital_location: string;
}

export const useFetchHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHospitals(); 
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error); 
        setError('Failed to fetch hospitals');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { hospitals, loading, error };
};
