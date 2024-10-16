import { fetchHospitalsAPI, addHospitalAPI } from '@/app/api/hospital/hospital'; 

export interface FormData {
  name: string; 
  type: string; 
  hospital_location: string;
  sub_location: string;
  village: string;
  created_at: string; 
  updated_at: string; 
}

export interface Hospital extends FormData {
  id: number; 
}

export async function fetchHospitals() {
  try {
    const { hospitalData } = await fetchHospitalsAPI();

    const mergedData = hospitalData.map((hospital: Hospital) => {
      return {
        ...hospital,
        name: hospital.name || 'N/A',
        type: hospital.type || 'N/A',
        hospital_location: hospital.hospital_location || 'N/A',
        sub_location: hospital.sub_location || 'N/A',
        village: hospital.village || 'N/A',
        created_at: hospital.created_at || 'N/A',
        updated_at: hospital.updated_at || 'N/A',
      };
    });

    return mergedData;
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw new Error('Failed to fetch hospitals');
  }
}

export async function addHospital(hospitalData: FormData) {
  try {
    const response = await addHospitalAPI(hospitalData);
    if (!response.ok) {
      throw new Error('Failed to add hospital');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding hospital:', error);
    throw new Error('Failed to add hospital');
  }
}

