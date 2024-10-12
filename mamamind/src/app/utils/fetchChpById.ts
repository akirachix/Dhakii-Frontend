export const fetchChpById = async (id: string) => {
  try {
    const response = await fetch(`/api/chps/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch CHP');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
