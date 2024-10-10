

export const userLogin = async (email: string, password: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 
 
  try {
    const response = await fetch(`${baseUrl}/api/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
 
 
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed.');
    }
 
 
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
 };
 