export interface Nurse {
  firstname: string;
  lastname: string;
  hospital: string;
  phone_number: string;
  nurse_id: number;
  email: string;
  username: string;
  gender: string;
  reg_no: string;
  sub_location: string;
}

export interface NurseData {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
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
