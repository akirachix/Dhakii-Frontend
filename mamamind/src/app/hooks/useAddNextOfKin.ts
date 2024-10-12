
// import { useState } from 'react';
// import { addNextOfKin } from '@/app/utils/addNextOfKin'; 
// import { NextOfKin } from '@/app/utils/types';

// export const useAddNextOfKin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAddNextOfKin = async (nextOfKinData: NextOfKin) => {
//     setLoading(true);
//     try {
//       await addNextOfKin(nextOfKinData); 
//       setError(null); 
//     } catch (err: any) {
//       console.error('Error adding next of kin:', err);
//       setError(err.message || 'Failed to add next of kin');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleAddNextOfKin, loading, error };
// };

import { useState } from 'react';
import { addNextOfKin } from '@/app/utils/addNextOfKin'; 
import { NextOfKin } from '@/app/utils/types';

export const useAddNextOfKin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddNextOfKin = async (nextOfKinData: NextOfKin) => {
    setLoading(true);
    try {
      await addNextOfKin(nextOfKinData); 
      setError(null); 
    } catch (err: unknown) { 
      console.error('Error adding next of kin:', err);
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('Failed to add next of kin due to an unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleAddNextOfKin, loading, error };
};
