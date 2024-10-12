

import { fetchMotherById } from './fetchMotherbyId';
import { fetchNextOfKinById } from './fetchNextOfKinById';
import { Mother as MotherType, NextOfKin } from './types';

export const fetchMotherWithNextOfKin = async (id: number): Promise<{ mother: MotherType; nextOfKin: NextOfKin | null }> => { 
  try {
    const motherData = await fetchMotherById(id);

    const kinData = motherData.nextOfKinId ? await fetchNextOfKinById(motherData.nextOfKinId) : null; 
     
    return { mother: motherData, nextOfKin: kinData };
  } catch (error: any) {
    console.error('Error fetching mother or next of kin data:', error.message || error);
    throw error;
  }
};

