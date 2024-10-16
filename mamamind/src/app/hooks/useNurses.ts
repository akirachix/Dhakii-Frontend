import { useCallback, useEffect, useState } from 'react';
import { Nurse } from '@/app/utils/types';
import { fetchNurses } from '@/app/utils/fetchAllNurses';

export const useNurses = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);   
  const itemsPerPage = 10; 

  const fetchNursesData = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const data = await fetchNurses(page, itemsPerPage);  

      if (data && data.nurses && Array.isArray(data.nurses)) {
        setNurses(data.nurses);  
        setTotalPages(data.totalPages);  
        setError(null);
      } else {
        throw new Error("Invalid nurses data.");
      }
    } catch (error) {
      setError((error as Error).message || 'Failed to fetch nurses');
      setNurses([]); 
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchNursesData(currentPage);  
  }, [fetchNursesData, currentPage]);

  return { 
    nurses, 
    loading, 
    error, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    refetch: fetchNursesData 
  };
};
