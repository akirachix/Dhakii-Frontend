import { useState, useEffect } from 'react';
import { fetchCHPs } from '@/app/utils/chp';

interface CHP {
  id: number;
  first_name: string;
  last_name: string;
  village: string;
}

export const useFetchCHPs = () => {
  const [chps, setCHPs] = useState<CHP[]>([]);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCHPs();
        setCHPs(data);
      } catch (error) {
        console.error('Error fetching CHPs:', error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { chps, loading };
};

