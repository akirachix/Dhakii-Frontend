// hooks/useNurses.ts
import { useCallback, useEffect, useState } from 'react';
import { Nurse } from '@/app/utils/types';
import { fetchNurses } from '@/app/utils/fetchAllNurses';

export const useNurses = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const [totalPages, setTotalPages] = useState(1);    // Track the total number of pages
  const itemsPerPage = 10; // Set the number of items per page

  const fetchNursesData = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const data = await fetchNurses(page, itemsPerPage);  // Fetch nurses with manual pagination

      if (data && data.nurses && Array.isArray(data.nurses)) {
        setNurses(data.nurses);  // Set nurses from the response
        setTotalPages(data.totalPages);  // Set total pages based on the response
        setError(null);
      } else {
        throw new Error("Invalid nurses data.");
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch nurses');
      setNurses([]);  // Clear the list in case of error
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchNursesData(currentPage);  // Fetch nurses on page change
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
