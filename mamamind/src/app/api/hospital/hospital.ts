
export async function fetchHospitalsAPI() {
    const hospitalResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/hospitals/');
    const hospitalData = await hospitalResponse.json();
  
    return { hospitalData};
  }
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addHospitalAPI(hospitalData: any) {
    const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/hospitals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospitalData),
    });
    
    return response;
  }
  