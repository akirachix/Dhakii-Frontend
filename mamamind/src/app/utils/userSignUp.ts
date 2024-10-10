
interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  phonenumber: string;
  username: string;
}

const url = '/api/users'; 

// export const userSignup = async (userData: UserData) => {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         first_name: userData.firstname,
//         last_name: userData.lastname,
//         email: userData.email,
//         password: userData.password,
//         user_role: userData.role,
//         phone_number: userData.phonenumber,
//         username: userData.username,
//       }),
//     });

//     if (!response.ok) {
//       const text = await response.text();
//       console.error('Full response from server:', text);
//       throw new Error(text || 'Something went wrong. Please try again.'); 
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error during signup:', error);
//     throw new Error((error as Error).message || 'An unexpected error occurred. Please try again.');
//   }
// };


export const userSignup = async (userData: UserData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: userData.firstname,
        last_name: userData.lastname,
        email: userData.email,
        password: userData.password,
        user_role: userData.role,
        phone_number: userData.phonenumber,
        username: userData.username,
      }),
    });

    const responseData = await response.text();
    console.log('Server Response:', responseData); // Check full response
   
    if (!response.ok) {
      throw new Error(responseData || 'Something went wrong. Please try again.'); 
    }

    const data = JSON.parse(responseData);
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error(error instanceof Error ? error.message : 'Unexpected error occurred.');
  }
};