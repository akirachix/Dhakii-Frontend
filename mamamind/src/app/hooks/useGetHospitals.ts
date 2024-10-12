import { useState, useEffect } from 'react';
import { fetchHospitalById } from '../utils/fetchHospitalById'; 

export interface Hospital {
  id: number;
  name: string;
  village: string;
  hospital_location: string;
  sub_location: string;
  type: string;
  created_at: string;
//   updated_at: string;
}

const useGetHospitalData = (hospitalId: string) => {
  const [hospitalData, setHospitalData] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHospitalData = async () => {
      try {
        const data = await fetchHospitalById(hospitalId); 
        setHospitalData(data);
      } catch {
        setError('Failed to fetch hospital data');
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      getHospitalData();
    }
  }, [hospitalId]);

  return { hospitalData, loading, error };
};

export default useGetHospitalData;
