
export interface Mother {
  nextOfKinId: any;
  id?: number; 
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  no_of_children?: number; 
  date_of_reg?: string;
  tel_no?: string;
  marital_status?: string;
  sub_location?: string;
  village?: string;
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
  
  