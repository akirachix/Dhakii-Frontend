import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NurseData } from "@/app/utils/types";
import { addNurse } from "@/app/utils/addNurse";

interface NurseRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNurse: (nurseData: NurseData) => void;
}

const hospitals = [
  { id: 1, name: "MamaLucy" },
  { id: 2, name: "Kenyatta Hospital" },
  { id: 3, name: "Nairobi West" }
];

const phoneRegExp = /^(\+254|0)[1-9]\d{8}$/;

const nurseSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  firstname: Yup.string().required("First name is required"),  // Use firstname
  lastname: Yup.string().required("Last name is required"),    // Use lastname
  reg_no: Yup.string().required("Registration number is required"),
  sub_location: Yup.string().required("Sub-location is required"),
  hospital: Yup.string().required("Hospital is required"),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
});

const NurseRegistrationForm: React.FC<NurseRegistrationFormProps> = ({
  isOpen,
  onClose,
  onAddNurse,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NurseData>({
    resolver: yupResolver(nurseSchema),
  });

  const onSubmit = async (data: NurseData) => {
    const selectedHospital = hospitals.find(hospital => hospital.name === data.hospital);
    if (!selectedHospital) {
      throw new Error('Invalid hospital selected.');
    }

    const nursePayload = {
      ...data,
      hospital_id: selectedHospital.id,
    };

    await addNurse(nursePayload);
    onAddNurse(nursePayload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-xl md:max-w-2xl next-hub:max-w-lg next-hub:mt-4 next-hub:mb-4 next-hub-max:max-w-2xl next-hub-max:mt-4 next-hub-max:mb-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-left text-[#02A6A6]">Register Nurse</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            {[
              { label: "Username", name: "username" as const },
              { label: "Email", name: "email" as const },
              { label: "Password", name: "password" as const },
              { label: "First Name", name: "firstname" as const },   // Use firstname
              { label: "Last Name", name: "lastname" as const },     // Use lastname
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
                  className={`border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-1 ${
                    errors[name] ? "border-red-500" : ""
                  }`}
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
                {...register("hospital")}
                className={`border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-1 ${
                  errors.hospital ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Hospital</option>
                {hospitals.map(hospital => (
                  <option key={hospital.id} value={hospital.name}>{hospital.name}</option>
                ))}
              </select>
              {errors.hospital && (
                <p className="text-red-500 text-xs mt-1">{errors.hospital.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender")}
                className={`border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-1 ${
                  errors.gender ? "border-red-500" : ""
                }`}
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

          <div className="flex items-center justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 text-sm rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#F18721] hover:bg-[#E16701] text-white font-bold py-2 px-4 text-sm rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NurseRegistrationForm;
