// import { fetchCHPsAPI, addCHPAPI } from '../api/chp';

// export interface FormData {
//   first_name: string;
//   last_name: string;
//   username: string;
//   phone_number: string;
//   email: string;
//   reg_no: string;
//   location: string;
//   sub_location: string;
//   village: string;
//   registered_date: string;
//   user: string;
// }

// export interface CHP extends FormData {
//   id: number;
// }

// export async function fetchCHPs() {
//   try {
//     const { chpData, userData } = await fetchCHPsAPI();

//     const mergedData = chpData.map((chp: CHP) => {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const user = userData.find((u: any) => String(u.id) === String(chp.user));
//       return {
//         ...chp,
//         first_name: user ? user.first_name : 'N/A',
//         last_name: user ? user.last_name : 'N/A',
//         email: user ? user.email : 'N/A',
//         phone_number: user ? user.phone_number : 'N/A',
//         username: user ? user.username : 'N/A',
//       };
//     });

//     return mergedData;
//   } catch (error) {
//     console.error('Error fetching CHPs:', error);
//     throw new Error('Failed to fetch CHPs');
//   }
// }

// export async function addCHP(chpData: FormData) {
//   try {
//     const response = await addCHPAPI(chpData);
//     if (!response.ok) {
//       throw new Error('Failed to add CHP');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error adding CHP:', error);
//     throw new Error('Failed to add CHP');
//   }
// }

import { fetchCHPsAPI, addCHPAPI } from '../api/chp';

export interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  email: string;
  reg_no: string;
  location: string;
  sub_location: string;
  village: string;
  registered_date: string;
  user: string;
}

export interface CHP extends FormData {
  id: number;
  num_mothers: number;
}

export async function fetchCHPs() {
  try {
    const { chpData, userData, mothersData } = await fetchCHPsAPI();

    const mergedData = chpData.map((chp: CHP) => {
      const user = userData.find((u: any) => String(u.id) === String(chp.user));

      // Filter mothers based on matching villages
      const mothersAssigned = mothersData.filter(
        (mother: any) => mother.village.toLowerCase() === chp.village.toLowerCase()
      ).length;

      return {
        ...chp,
        first_name: user ? user.first_name : 'N/A',
        last_name: user ? user.last_name : 'N/A',
        email: user ? user.email : 'N/A',
        phone_number: user ? user.phone_number : 'N/A',
        username: user ? user.username : 'N/A',
        num_mothers: mothersAssigned,  // Assign number of mothers
      };
    });

    return mergedData;
  } catch (error) {
    console.error('Error fetching CHPs:', error);
    throw new Error('Failed to fetch CHPs');
  }
}

export async function addCHP(chpData: FormData) {
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


