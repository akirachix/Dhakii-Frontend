import { useState, useEffect } from 'react';
import { fetchPrevalenceData } from '../utils/fetchPrevalence';
import { Mother } from '../types/mothers';

export const usePpdPrevalence = () => {
  const [data, setData] = useState<Mother[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ppdMothers, setPpdMothers] = useState<Mother[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const result = await fetchPrevalenceData();
        
        console.log('Fetched data:', result);

       
        if (Array.isArray(result)) {
         
          setData(result);

          const mothersWithPpd = result.filter((item) => {
            const isPpd = item.total_score > 10;
            console.log(`Mother ID: ${item.mother?.id}, Total Score: ${item.total_score}, Is PPD: ${isPpd}`);
            return isPpd;
          });

        
          console.log('Mothers with PPD (score > 10):', mothersWithPpd.map(item => ({
            mother_id: item.mother?.id,
            name: `${item.mother?.first_name || 'N/A'} ${item.mother?.last_name || 'N/A'}`,
            date_of_birth: item.mother?.date_of_birth || 'N/A',
          })));

         
          setPpdMothers(mothersWithPpd);
        } else {
          setError('Data is not in the expected format (array).');
          console.error('Unexpected data format:', result);
        }
      } catch (err) {
        
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`An error occurred while fetching data: ${errorMessage}`);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false); 
      }
    };

    getData(); 
  }, []);

  return { data, ppdMothers, loading, error };
};

export default usePpdPrevalence;
