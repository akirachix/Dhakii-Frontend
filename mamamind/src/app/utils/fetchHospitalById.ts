export const fetchHospitalById = async (id: string) => {
    try {
      const response = await fetch(`/api/hospitals/${id}`); 
      if (!response.ok) {
        throw new Error('Failed to fetch Hospital'); 
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  