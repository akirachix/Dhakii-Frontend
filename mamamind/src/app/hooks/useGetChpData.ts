import { useState, useEffect } from 'react';
import { fetchChpById } from '../utils/fetchChpById';

export interface CHP {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  username: string;
  user: string;
  village: string;
  location: string;
  sub_location: string;
  reg_no: string;
  registered_date: string;
}

const useGetChpData = (chpId: string) => {
  const [chpData, setChpData] = useState<CHP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getChpData = async () => {
      try {
        const data = await fetchChpById(chpId);
        setChpData(data);
      } catch {
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


