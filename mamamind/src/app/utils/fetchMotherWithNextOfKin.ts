

// import { fetchMotherById } from './fetchMotherbyId';
// import { fetchNextOfKinByMotherId } from './fetchNextOfKinById';
// import { Mother as MotherType, NextOfKin } from './types';

// export const fetchMotherWithNextOfKin = async (id: number): Promise<{ mother: MotherType; nextOfKin: NextOfKin | null }> => { 
//   try {
//     const motherData = await fetchMotherById(id);

//     const kinData = motherData.nextOfKinId ? await fetchNextOfKinByMotherId(motherData.nextOfKinId) : null; 
     
//     return { mother: motherData, nextOfKin: kinData };
//   } catch (error: any) {
//     console.error('Error fetching mother or next of kin data:', error.message || error);
//     throw error;
//   }
// };

import { fetchMotherById } from './fetchMotherbyId';
import { fetchNextOfKinByMotherId } from './fetchNextOfKinById'; 
import { Mother as MotherType, NextOfKin } from './types';

export const fetchMotherWithNextOfKin = async (id: number): Promise<{ mother: MotherType; nextOfKin: NextOfKin[] | null }> => {
  try {
    const motherData = await fetchMotherById(id);

    if (!motherData.id) {
      throw new Error('Mother ID is undefined');
    }

    const kinData = await fetchNextOfKinByMotherId(motherData.id); // Fetch next of kin by mother's ID

    return { mother: motherData, nextOfKin: kinData.length > 0 ? kinData : null }; // Return null if no kin found
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error fetching mother or next of kin data:', message);
    throw new Error(message);
  }
};
