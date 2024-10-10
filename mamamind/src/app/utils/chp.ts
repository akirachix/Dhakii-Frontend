import { fetchCHPsAPI, addCHPAPI } from '../api/chp';

// Fetch CHPs with merged user data
export async function fetchCHPs() {
  try {
    const { chpData, userData } = await fetchCHPsAPI(); 

    // Merging CHP data with user data
    const mergedData = chpData.map((chp: any) => {
      const user = userData.find((u: any) => String(u.id) === String(chp.user));
      return {
        ...chp,
        first_name: user ? user.first_name : 'N/A',
        last_name: user ? user.last_name : 'N/A',
        email: user ? user.email : 'N/A',
        phone_number: user ? user.phone_number : 'N/A',
        username: user ? user.username : 'N/A',
      };
    });

    return mergedData; 
  } catch (error) {
    console.error('Error fetching CHPs:', error);
    throw new Error('Failed to fetch CHPs');
  }
}

// Add CHP
export async function addCHP(chpData: any) {
  try {
    const response = await addCHPAPI(chpData);
    if (!response.ok) {
      throw new Error('Failed to add CHP');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding CHP:', error);
    throw new Error('Failed to add CHP');
  }
}