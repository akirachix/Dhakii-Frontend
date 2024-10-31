export interface NurseData {
  location: string;
  username: string;
  email: string;
  firstname: string;  // Keep as firstname for backend consistency
  lastname: string;   // Keep as lastname for backend consistency
  password: string; 
  reg_no: string;
  sub_location: string;
  hospital: string;
  phone_number: string;
  gender: string;
}

export interface RegistrationSuccessResponse {
  message: string;
  nurse: {
    firstname: string;
    lastname: string;
    specialization: string;
  };
}

export interface RegistrationErrorResponse {
  error: string;
}

export interface Mother {
  id?: number; 
  first_name: string;
  last_name: string;
  date_of_birth: string;
  no_of_children: number; 
  date_of_reg: string;
  tel_no: string;
  marital_status: string;
  sub_location: string;
  village: string;
}

export interface NextOfKin {
  id?: number; 
  first_name: string;
  last_name: string;
  phone_number: string;
  relationship: string;
  mother_id: number; 
}

export interface MotherDetails {
  id?: number; // Make `id` optional for the initial state
  first_name: string;
  last_name: string;
  date_of_birth: string;
  no_of_children: number;
  date_of_reg: string;
  tel_no: string;
  marital_status: string;
  sub_location: string;
  village: string;
}

export interface NextOfKinDetails {
  id?: number; 
  first_name: string;
  last_name: string;
  phone_number: string;
  relationship: string;
  mother_id: number; // This will link Next of Kin to the mother
}

export interface FormData {
  motherDetails: MotherDetails;
  nextOfKin: NextOfKinDetails;
}

export interface Nurse {
  firstname: string;  // Nurse model uses firstname and lastname
  lastname: string;
  hospital: string;
  phone_number: string;
  nurse_id?: number;
  email: string;
  username: string;
  gender: string;
  reg_no: string;
  sub_location: string;
}

 