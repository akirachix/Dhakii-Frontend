

export interface NurseData {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
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
    first_name: string;
    last_name: string;
    specialization: string;
  };
}

export interface RegistrationErrorResponse {
  error: string;
}

export interface Mother {
  nextOfKinId?: number;
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
  
  export interface RegistrationSuccessResponse {
    message: string;
    admin: {
      firstName: string;
      lastName: string;
      marital_status: string;

    };
  }
  export interface RegistrationErrorResponse {
    error: string;
  }
  export interface MotherDetails {
  nextOfKinId?: number;

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
  
  export interface NextOfKinDetails {
  id?: number; 
  first_name: string;
  last_name: string;
  phone_number: string;
  relationship: string;
  mother_id: number;
  }
  
  export interface FormData {
    motherDetails: MotherDetails;
    nextOfKin: NextOfKinDetails;
  }
  export interface Nurse {
    firstname: string;
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
  
  
