
// import { Mother as MotherType } from './types'; 

// export const fetchMothers = async (): Promise<MotherType[]> => {
//   try {
//     const response = await fetch('/api/list_mothers', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch mothers. Status: ${response.status} - ${response.statusText}`);
//     }

//     const data = await response.json() as MotherType[];
//     console.log('Fetched mothers data:', data);
//     return data;
//   } catch (error) {
//     const message = error instanceof Error ? error.message : String(error);
//     console.error('Error fetching mothers data:', message);
//     throw new Error(message); 
//   }
// };



import { Mother as MotherType } from './types'; 

export const fetchMothers = async (): Promise<MotherType[]> => {
  try {
    const response = await fetch('/api/list_mothers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch mothers. Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json() as MotherType[];
    console.log('Fetched mothers data:', data);

    // Filter mothers based on allowed locations
    const allowedLocations = [
      "Soweto East",
      "Laini Saba",
      "Highridge",
      "Mathare 4A",
      "Soweto",
      "Phase 4",
      "Mukuru Kwa Reuben",
      "Ngei 1",
      "Stage 2",
      "Majengo"
    ];

    // Filter the fetched mothers by allowed locations
    const filteredMothers = data.filter((mother) => allowedLocations.includes(mother.village));
    return filteredMothers;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error fetching mothers data:', message);
    throw new Error(message); 
  }
};
