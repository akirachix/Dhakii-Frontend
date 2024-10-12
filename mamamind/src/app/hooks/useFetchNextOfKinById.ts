// import { useState } from 'react';
// import { fetchNextOfKinById } from '../utils/fetchNextOfKinById';
// import { NextOfKin } from '@/app/utils/types'; // Adjust path if necessary

// export const useFetchNextOfKinById = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [nextOfKin, setNextOfKin] = useState<NextOfKin | null>(null);

//   const handleFetchNextOfKinById = async (id: number) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const fetchedNextOfKin = await fetchNextOfKinById(id);
//       setNextOfKin(fetchedNextOfKin);
//     } catch (err: any) {
//       console.error('Error fetching next of kin:', err);
//       setError(err.message || 'Failed to fetch next of kin');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleFetchNextOfKinById, loading, error, nextOfKin };
// };

import { useState } from 'react';
import { fetchNextOfKinById } from '../utils/fetchNextOfKinById';
import { NextOfKin } from '@/app/utils/types'; // Adjust path if necessary

export const useFetchNextOfKinById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextOfKin, setNextOfKin] = useState<NextOfKin | null>(null);

  const handleFetchNextOfKinById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedNextOfKin = await fetchNextOfKinById(id);
      setNextOfKin(fetchedNextOfKin);
    } catch (err: unknown) { 
      console.error('Error fetching next of kin:', err);
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('Failed to fetch next of kin'); 
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleFetchNextOfKinById, loading, error, nextOfKin };
};
