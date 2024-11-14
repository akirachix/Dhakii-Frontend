
// export async function fetchCHPsAPI() {
//   const chpResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/chps/');
//   const chpData = await chpResponse.json();

//   const userResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/users/');
//   const userData = await userResponse.json();

//   return { chpData, userData };
// }

export async function fetchCHPsAPI() {
  const chpResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/chps/');
  const chpData = await chpResponse.json();

  const userResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/users/');
  const userData = await userResponse.json();

  const mothersResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/mothers/');
  const mothersData = await mothersResponse.json();

  return { chpData, userData, mothersData };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addCHPAPI(chpData: any) {
  const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/chps/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chpData),
  });
  
  return response;
}



