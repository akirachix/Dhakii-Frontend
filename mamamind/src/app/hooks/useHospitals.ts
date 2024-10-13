import { useState, useEffect, useCallback } from 'react';
import { fetchHospitals, addHospital, Hospital, FormData } from '@/app/utils/hospitalTypes'; 

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);  
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHospitalsData();
  }, []);

  const fetchHospitalsData = async () => {
    try {
      const data = await fetchHospitals(); 
      setHospitals(data);
    } catch (error) {
      setError((error as Error).message);
      setHospitals([]);
    }
  };

  const filterHospitals = useCallback(() => {
    const filtered = hospitals.filter((hospital) => {
      if (!hospital) return false;
      const searchLower = searchQuery.toLowerCase();
      return (
        (hospital.name && hospital.name.toLowerCase().includes(searchLower)) ||
        (hospital.village && hospital.village.toLowerCase().includes(searchLower)) ||
        (hospital.hospital_location && hospital.hospital_location.toLowerCase().includes(searchLower))
      );
    });
    setFilteredHospitals(filtered);
    setCurrentPage(1);
  }, [hospitals, searchQuery]);

  useEffect(() => {
    filterHospitals();
  }, [searchQuery, hospitals, filterHospitals]);

  const handleAddHospital = async (hospitalData: FormData) => {
    try {
      const addedHospital = await addHospital(hospitalData); 
      setHospitals((prevHospitals) => [addedHospital, ...prevHospitals]);  
      setFilteredHospitals((prevFilteredHospitals) => [addedHospital, ...prevFilteredHospitals]);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    hospitals,
    filteredHospitals,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    error,
    handleAddHospital, 
  };
}
