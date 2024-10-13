// import { useState } from 'react';
// import { addMother } from '@/app/utils/addMother'; 
// import { Mother } from '@/app/utils/types';

// export const useAddMother = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAddMother = async (motherData: Mother) => {
//     setLoading(true);
//     setError(null); 
//     try {
//       await addMother(motherData); 
//     } catch (err: any) {
//       console.error('Error adding mother:', err);
//       setError(err.message || 'Failed to add mother');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleAddMother, loading, error };
// };

import { useState } from 'react';
import { addMother } from '@/app/utils/addMother'; 
import { Mother } from '@/app/utils/types';

export const useAddMother = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddMother = async (motherData: Mother) => {
    setLoading(true);
    setError(null); 
    try {
      await addMother(motherData); 
    } catch (err) {
      console.error('Error adding mother:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to add mother');
      } else {
        setError('Failed to add mother');
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleAddMother, loading, error };
};
