import { useState, useEffect, useCallback } from 'react';
import { fetchNurseAdmins, addNurseAdmin, NurseAdmin, FormData } from '@/app/utils/nurseAdmin';

export function useNurseAdmins() {
  const [nurseAdmins, setNurseAdmins] = useState<NurseAdmin[]>([]);
  const [filteredNurseAdmins, setFilteredNurseAdmins] = useState<NurseAdmin[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNurseAdminsData();
  }, []);

  const fetchNurseAdminsData = async () => {
    try {
      const data = await fetchNurseAdmins();
      setNurseAdmins(data);
    } catch (error) {
      setError((error as Error).message);
      setNurseAdmins([]);
    }
  };

  const filterNurseAdmins = useCallback(() => {
    const filtered = nurseAdmins.filter((nurseAdmin) => {
      if (!nurseAdmin) return false;
      const searchLower = searchQuery.toLowerCase();
      return (
        (nurseAdmin.firstname && nurseAdmin.firstname.toLowerCase().includes(searchLower)) ||
        (nurseAdmin.lastname && nurseAdmin.lastname.toLowerCase().includes(searchLower)) ||
        (nurseAdmin.location && nurseAdmin.location.toLowerCase().includes(searchLower))
      );
    });
    setFilteredNurseAdmins(filtered);
    setCurrentPage(1);
  }, [nurseAdmins, searchQuery]);

  useEffect(() => {
    filterNurseAdmins();
  }, [searchQuery, nurseAdmins, filterNurseAdmins]);

  const handleAddNurseAdmin = async (nurseAdminData: FormData) => {
    try {
      const addedNurseAdmin = await addNurseAdmin(nurseAdminData);
      setNurseAdmins((prevNurseAdmins) => [addedNurseAdmin, ...prevNurseAdmins]);
      setFilteredNurseAdmins((prevFilteredNurseAdmins) => [addedNurseAdmin, ...prevFilteredNurseAdmins]);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    nurseAdmins,
    filteredNurseAdmins,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    onPageChange,
    error,
    handleAddNurseAdmin,
  };
}


