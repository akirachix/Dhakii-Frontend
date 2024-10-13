import { useState, useEffect, useCallback } from 'react';
import { fetchCHPs, addCHP, CHP, FormData } from '@/app/utils/chp'; 

export function useCHPs() {
  const [chps, setCHPs] = useState<CHP[]>([]);  
  const [filteredCHPs, setFilteredCHPs] = useState<CHP[]>([]);  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCHPsData();
  }, []);

  const fetchCHPsData = async () => {
    try {
      const data = await fetchCHPs();
      setCHPs(data);
    } catch (error) {
      setError((error as Error).message);
      setCHPs([]);
    }
  };

  const filterCHPs = useCallback(() => {
    const filtered = chps.filter((chp) => {
      if (!chp) return false;
      const searchLower = searchQuery.toLowerCase();
      return (
        (chp.first_name && chp.first_name.toLowerCase().includes(searchLower)) ||
        (chp.last_name && chp.last_name.toLowerCase().includes(searchLower)) ||
        (chp.village && chp.village.toLowerCase().includes(searchLower))
      );
    });
    setFilteredCHPs(filtered);
    setCurrentPage(1);
  }, [chps, searchQuery]);

  useEffect(() => {
    filterCHPs();
  }, [searchQuery, chps, filterCHPs]);

  const handleAddCHP = async (chpData: FormData) => {
    try {
      const addedCHP = await addCHP(chpData);
      setCHPs((prevCHPs) => [addedCHP, ...prevCHPs]);  
      setFilteredCHPs((prevFilteredCHPs) => [addedCHP, ...prevFilteredCHPs]);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    chps,
    filteredCHPs,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    error,
    handleAddCHP,  
  };
}



