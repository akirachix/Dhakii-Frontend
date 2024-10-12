import { useEffect, useState } from 'react';
import { Nurse } from '../utils/types';
import { fetchNurseById } from '../utils/fetchNursesByid';

export const useNurseById = (id: number) => {
  const [nurse, setNurse] = useState<Nurse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNurse = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const data = await fetchNurseById(id);
        console.log('Fetched nurse data in hook:', data);
        setNurse(data); 
      } catch (err: any) {
        console.error('Error fetching nurse:', err);
        setError(err.message || 'Failed to fetch nurse'); 
      } finally {
        setLoading(false); 
      }
    };

    if (id) {
      getNurse();
    }
  }, [id]); 

  return { nurse, loading, error }; 
};
