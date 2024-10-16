export async function fetchNurseAdminsAPI() {
  const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/nurse_admins/');
  const nurseAdminData = await response.json();
  return nurseAdminData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addNurseAdminAPI(nurseAdminData: any) {
  const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/nurse_admins/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nurseAdminData),
  });
  
  return response;
}
