import { useState, useEffect } from 'react';
import { Nurse } from "@/app/utils/types";

export const useNurses = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await fetch('/api/nurses');  
        if (!response.ok) {
          throw new Error('Failed to fetch nurses');
        }
        const data = await response.json();
        setNurses(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  return { nurses, loading, error };
};
