import { useState, useEffect } from 'react';
import { fetchNurseAdminById } from '../utils/fetchNurseAdminById';

export interface NurseAdmin {
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
  user: number; // This is referencing the user who is the nurse admin
}

const useGetNurseAdminData = (nurseAdminId: string) => {
  const [nurseAdminData, setNurseAdminData] = useState<NurseAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNurseAdminData = async () => {
      try {
        const data = await fetchNurseAdminById(nurseAdminId);
        setNurseAdminData(data);
      } catch {
        setError('Failed to fetch Nurse Admin data');
      } finally {
        setLoading(false);
      }
    };

    getNurseAdminData();
  }, [nurseAdminId]);

  return { nurseAdminData, loading, error };
};

export default useGetNurseAdminData;
