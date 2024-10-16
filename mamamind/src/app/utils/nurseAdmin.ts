export interface NurseAdmin {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  phone_number: string;
  email: string;
  hospital_id: number;
  location: string;
  created_at: string;
  sub_location: string;
  user: number; // This is referencing the user who is the nurse admin
}

export interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  phone_number: string;
  email: string;
  hospital_id: number; // Ensure it's number not string
  location: string;
  sub_location: string;
  user: number; // Must be a number
}

// Fetch all nurse admins API function
export async function fetchNurseAdmins() {
  const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/nurse_admins/');
  if (!response.ok) {
    throw new Error('Failed to fetch nurse admins');
  }
  return await response.json();
}

// Add a nurse admin API function
export async function addNurseAdmin(nurseAdminData: FormData) {
  const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/nurse_admins/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nurseAdminData),
  });
  if (!response.ok) {
    throw new Error('Failed to add nurse admin');
  }
  return await response.json();
}


