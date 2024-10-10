
import { useState, useEffect } from 'react';
import { fetchChpById } from '../utils/fetchChpById';

const useGetChpData = (chpId: string) => {
  const [chpData, setChpData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getChpData = async () => {
      try {
        const data = await fetchChpById(chpId);  
        setChpData(data);
      } catch (err) {
        setError('Failed to fetch CHP data');
      } finally {
        setLoading(false);
      }
    };

    getChpData();
  }, [chpId]);

  return { chpData, loading, error };
};

export default useGetChpData;