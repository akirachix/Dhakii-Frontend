

// interface UserData {
//     email: string;
//     password: string;
//     Username:string;
//   }
//   const url = 'api/users/login';
//   export const userLogin = async (userData: UserData) => {
//       try {
//           const response = await fetch(url, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                   email: userData.email,
//                   password: userData.password,
//                   Username:userData.Username,
//               }),
//           });
//           if (!response.ok) {
//               const text = await response.text();
//               console.error('Full response from server:', text);
//               if (response.status >= 500) {
//                   throw new Error('We are experiencing technical difficulties. Please try again later.');
//               } else if (response.status === 400) {
//                   throw new Error('An account with this email already exists. Please try logging in.');
//               } else {
//                   throw new Error('Something went wrong. Please try again.');
//               }
//           }
//           const data = await response.json();
//           return data;
//       } catch (error) {
//           console.error('Error during signup:', error);
//           throw new Error((error as Error).message || 'An unexpected error occurred. Please try again.');
//       }
//   };


// utils/userLogin.ts
interface UserData {
    email: string;
    password: string;
    Username: string;
}

const url = 'api/users/login';

export const userLogin = async (userData: UserData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                Username: userData.Username,
            }),
        });
        
        console.log('Response status:', response.status);  
        
        if (!response.ok) {
            const text = await response.text();
            console.error('Full response from server:', text);  
            if (response.status >= 500) {
                throw new Error('We are experiencing technical difficulties. Please try again later.');
            } else if (response.status === 400) {
                throw new Error('An account with this email already exists. Please try logging in.');
            } else {
                throw new Error('Something went wrong. Please try again.');
            }
        }

        const data = await response.json();
        console.log('Login successful:', data);  
        return data;

    } catch (error) {
        console.error('Error during login:', error);
        throw new Error((error as Error).message || 'An unexpected error occurred. Please try again.');
    }
};
