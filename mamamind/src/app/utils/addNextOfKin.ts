

// import { NextOfKin } from "./types";

// export const addNextOfKin = async (data: NextOfKin): Promise<NextOfKin> => {
//   try {
//     // Ensure all fields are present
//     if (!data.first_name || !data.last_name || !data.relationship || !data.phone_number || !data.mother_id) {
//       throw new Error('All fields are required to add a next of kin.');
//     }

//     // Make the API call to add next of kin
//     const response = await fetch('/api/addnextofkin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     // Handle non-200 status codes
//     if (!response.ok) {
//       const errorResponse = await response.json();  // Get error details from response
//       console.error('Error Response:', errorResponse);
//       throw new Error(`Failed to add next of kin. Status: ${response.status} - ${errorResponse.error || response.statusText}`);
//     }

//     // Successfully added the next of kin, return the data
//     const newNextOfKin: NextOfKin = await response.json();
//     console.log('Added next of kin data:', newNextOfKin);
//     return newNextOfKin;

//   } catch (error: unknown) {
//     // Handle errors
//     if (error instanceof Error) {
//       console.error('Error adding next of kin data:', error.message);
//       throw new Error(`Error adding next of kin: ${error.message}`);  // Re-throw to handle it outside
//     } else {
//       console.error('Unknown error occurred while adding next of kin.');
//       throw new Error('An unknown error occurred while adding next of kin.');
//     }
//   }
// };


import { NextOfKin } from "./types";

export const addNextOfKin = async (data: NextOfKin): Promise<NextOfKin> => {
  try {
    // Ensure all fields are present
    if (!data.first_name || !data.last_name || !data.relationship || !data.phone_number || !data.mother_id) {
      throw new Error('All fields are required to add a next of kin.');
    }

    // Make the API call to add next of kin
    const response = await fetch('/api/addnextofkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(`Failed to add next of kin. Status: ${response.status} - ${errorResponse.error || response.statusText}`);
    }

    const newNextOfKin: NextOfKin = await response.json();
    console.log('Added next of kin data:', newNextOfKin);
    return newNextOfKin;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding next of kin:', error.message);
      throw new Error(`Error adding next of kin: ${error.message}`);
    } else {
      console.error('Unknown error occurred while adding next of kin.');
      throw new Error('An unknown error occurred while adding next of kin.');
    }
  }
};
