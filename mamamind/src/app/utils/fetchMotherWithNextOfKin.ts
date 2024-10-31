

// import { fetchMotherById } from './fetchMotherById';
// import { fetchNextOfKinByMotherId } from './fetchNextOfKinById'; 
// import { Mother as MotherType, NextOfKin } from './types';

// export const fetchMotherWithNextOfKin = async (id: number): Promise<{ mother: MotherType; nextOfKin: NextOfKin[] | null }> => {
//   try {
//     const motherData = await fetchMotherById(id);

//     if (!motherData.id) {
//       throw new Error('Mother ID is undefined');
//     }

//     const kinData = await fetchNextOfKinByMotherId(motherData.id); 
//     return { mother: motherData, nextOfKin: kinData.length > 0 ? kinData : null }; 
//   } catch (error) {
//     const message = error instanceof Error ? error.message : String(error);
//     console.error('Error fetching mother or next of kin data:', message);
//     throw new Error(message);
//   }
// };



import { fetchMotherById } from './fetchMotherById';
import { fetchNextOfKinByMotherId } from './fetchNextOfKinById'; 
import { Mother as MotherType, NextOfKin } from './types';

export const fetchMotherWithNextOfKin = async (id: number): Promise<{ mother: MotherType; nextOfKin: NextOfKin[] | null }> => {
  try {
    const motherData = await fetchMotherById(id);

    if (!motherData.id) {
      throw new Error('Mother ID is undefined');
    }

    const kinData = await fetchNextOfKinByMotherId(motherData.id); 
    return { mother: motherData, nextOfKin: kinData.length > 0 ? kinData : null }; 
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error fetching mother or next of kin data:', message);
    throw new Error(message);
  }
};

