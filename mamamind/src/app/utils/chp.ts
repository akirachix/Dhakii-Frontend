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
  password: String;
  username: string;
  phone_number: string;
  email: string;
  reg_no: string;
  location: string;
  sub_location: string;
  village: string;
  user: string;
  hospital: string;  
  registered_date: String;

}

export interface CHP extends FormData {
  id: number;
}

// Function to fetch all CHPs and merge data with user information
export async function fetchCHPs() {
  try {
    const { chpData, userData } = await fetchCHPsAPI();

    const mergedData = chpData.map((chp: CHP) => {
      // Find matching user data based on user ID
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

// Function to add a new CHP
export async function addCHP(chpData: FormData) {
  try {
    const response = await addCHPAPI(chpData);
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.detail || 'Failed to add CHP';
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (error) {
    console.error('Error adding CHP:', error);
    throw new Error('Failed to add CHP');
  }
}
