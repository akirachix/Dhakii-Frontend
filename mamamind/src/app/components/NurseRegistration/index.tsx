import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NurseData, Nurse } from "@/app/utils/types"; // Ensure Nurse includes correct types
import { addNurse } from "@/app/utils/addNurse";

interface NurseRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNurse: (nurseData: Nurse) => void; // Updated to accept Nurse type
}

const phoneRegExp = /^(\+254|0)[1-9]\d{8}$/;

const nurseSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  reg_no: Yup.string().required("Registration number is required"),
  sub_location: Yup.string().required("Sub-location is required"),
  hospital_id: Yup.number().required("Hospital selection is required"),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
});

const NurseRegistrationForm: React.FC<NurseRegistrationFormProps> = ({
  isOpen,
  onClose,
  onAddNurse,
}) => {
  const [hospitals, setHospitals] = useState<{ id: number; name: string }[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<NurseData>({
    resolver: yupResolver(nurseSchema),
  });
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/hospitals`);
        const hospitalList = await response.json();
        setHospitals(hospitalList);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [baseUrl]);

  const onSubmit = async (data: NurseData) => {
    const nurse: Nurse = {
      username: data.username,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      reg_no: data.reg_no,
      sub_location: data.sub_location,
      hospital_id: data.hospital_id, // Use hospital_id directly
      phone_number: data.phone_number,
      gender: data.gender,
    };

    try {
      const newNurse = await addNurse(nurse);
      onAddNurse(newNurse);
      onClose();
    } catch (error) {
      console.error("Error adding nurse:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-[#02A6A6]">Register Nurse</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Username", name: "username" as const },
              { label: "Email", name: "email" as const },
              { label: "Password", name: "password" as const },
              { label: "First Name", name: "firstname" as const },
              { label: "Last Name", name: "lastname" as const },
              { label: "Reg No", name: "reg_no" as const },
              { label: "Sub-Location", name: "sub_location" as const },
              { label: "Phone Number", name: "phone_number" as const },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  type={name === "email" ? "email" : name === "password" ? "password" : "text"}
                  {...register(name)}
                  className={`border border-gray-300 rounded-md p-2 w-full ${errors[name] ? "border-red-500" : ""}`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
                )}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital <span className="text-red-500">*</span>
              </label>
              <select
                {...register("hospital_id")}
                className={`border border-gray-300 rounded-md p-2 w-full ${errors.hospital_id ? "border-red-500" : ""}`}
              >
                <option value="">Select Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                ))}
              </select>
              {errors.hospital_id && (
                <p className="text-red-500 text-xs mt-1">{errors.hospital_id.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender")}
                className={`border border-gray-300 rounded-md p-2 w-full ${errors.gender ? "border-red-500" : ""}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#02A6A6] text-white rounded-md p-2 mt-4 w-full"
          >
            Register Nurse
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NurseRegistrationForm;
