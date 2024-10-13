

import { useState } from 'react';
import { fetchMotherWithNextOfKin } from '../utils/fetchMotherWithNextOfKin'; 
import { Mother, NextOfKin } from '@/app/utils/types';

export const useFetchMotherWithNextOfKin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mother, setMother] = useState<Mother | null>(null);
  const [nextOfKin, setNextOfKin] = useState<NextOfKin[] | null>(null); 

  const handleFetchMotherWithNextOfKin = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const { mother: fetchedMother, nextOfKin: fetchedNextOfKin } = await fetchMotherWithNextOfKin(id);
      setMother(fetchedMother);
      setNextOfKin(fetchedNextOfKin); 
    } catch (err: unknown) { 
      console.error('Error fetching mother and next of kin:', err);
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('Failed to fetch mother with next of kin due to an unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleFetchMotherWithNextOfKin, loading, error, mother, nextOfKin };
};
