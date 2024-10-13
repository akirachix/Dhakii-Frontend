

import { useEffect, useState } from 'react';
import { fetchMothers } from '../utils/fetchMothers';
import { Mother } from '../utils/types';

export const useMothers = () => {
  const [mothers, setMothers] = useState<Mother[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMothers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMothers();
      console.log('Mothers data in hook:', data);
      const sortedData = [...data].sort((a, b) => (b.id || 0) - (a.id || 0));
      setMothers(sortedData);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching mothers:', err);
        setError(err.message);
      } else {
        console.error('Unexpected error fetching mothers:', err);
        setError('Failed to fetch mothers');
      }
    } finally {
      setLoading(false);
    }
  };

  const addNewMother = (newMother: Mother) => {
    setMothers(prevMothers => [newMother, ...prevMothers]);
  };

  useEffect(() => {
    getMothers();
  }, []);

  return { mothers, loading, error, getMothers, addNewMother }; 
};
