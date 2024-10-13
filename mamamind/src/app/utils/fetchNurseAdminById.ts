export const fetchNurseAdminById = async (id: string) => {
  try {
    const response = await fetch(`/api/nurse_admins/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Nurse Admin');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
