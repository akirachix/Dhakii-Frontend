const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/`; 


type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_role: string;
  phone_number: string;
  username: string;
};

export const userSignup = async (userData: UserData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        user_role: userData.user_role,
        phone_number: userData.phone_number,
        username: userData.username,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Full response from server:', text);
      throw new Error(text || 'Something went wrong. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error((error as Error).message || 'An unexpected error occurred. Please try again.');
  }
};


