
import { useState } from 'react';
import { addMother } from '@/app/utils/addMother';
import { Mother } from '@/app/utils/types';

export const useAddMother = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddMother = async (motherData: Mother): Promise<Mother | null> => {
    setLoading(true);
    setError(null);

    try {
      const savedMother = await addMother(motherData); // Call addMother and expect a Mother object
      return savedMother; // Return the saved Mother object
    } catch (err) {
      console.error('Error adding mother:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to add mother');
      } else {
        setError('Failed to add mother');
      }
      return null; // Return null in case of error
    } finally {
      setLoading(false);
    }
  };

  return { handleAddMother, loading, error };
};

