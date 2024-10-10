import { useState, useEffect } from 'react';
import { fetchCHPs } from '@/app/utils/chp';

export const useFetchCHPs = () => {
  const [chps, setCHPs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCHPs();
        setCHPs(data);
      } catch (error) {
        setError('Error fetching CHPs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { chps, loading, error };
};