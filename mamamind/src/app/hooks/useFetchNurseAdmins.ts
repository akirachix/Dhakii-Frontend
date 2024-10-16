import { useState, useEffect } from 'react';
import { fetchNurseAdmins } from '@/app/utils/nurseAdmin';

interface NurseAdmin {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    phone_number: string;
    email: string;
    hospital_id: number;
    location: string;
    created_at: string;
    sub_location: string;
    user: number; 
  }

export const useFetchNurseAdmins = () => {
  const [nurseAdmins, setNurseAdmins] = useState<NurseAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNurseAdmins();
        setNurseAdmins(data);
      } catch (error) {
        console.error('Error fetching Nurse Admins:', error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { nurseAdmins, loading };
};
