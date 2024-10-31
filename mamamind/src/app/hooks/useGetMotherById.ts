
import { useState } from 'react';
import { fetchMotherById } from '../utils/fetchMotherById';
import { Mother } from '@/app/utils/types'; 

export const useFetchMotherById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mother, setMother] = useState<Mother | null>(null);

  const handleFetchMotherById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedMother = await fetchMotherById(id);
      setMother(fetchedMother);
    } catch (err: unknown) { 
      console.error('Error fetching mother:', err);
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('Failed to fetch mother'); 
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleFetchMotherById, loading, error, mother };
};
