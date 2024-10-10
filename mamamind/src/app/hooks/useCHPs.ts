import { useState, useEffect } from 'react';
import { fetchCHPs, addCHP } from '@/app/utils/chp';

interface CHP {
  id: number;
  first_name: string; 
  last_name: string;
  village: string;
}


export function useCHPs() {
  const [chps, setCHPs] = useState<CHP[]>([]);
  const [filteredCHPs, setFilteredCHPs] = useState<CHP[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCHPsData();
  }, []);

  useEffect(() => {
    filterCHPs();
  }, [searchQuery, chps]);

  const fetchCHPsData = async () => {
    try {
      const data = await fetchCHPs();
      setCHPs(data);
    } catch (error) {
      setError((error as Error).message);
      setCHPs([]);
    }
  };

  const filterCHPs = () => {
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
  };

  const handleAddCHP = async (chpData: CHP) => {
    try {
      await addCHP(chpData);

      setCHPs((prevCHPs) => [chpData, ...prevCHPs]);

      setFilteredCHPs((prevFilteredCHPs) => [chpData, ...prevFilteredCHPs]);

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





