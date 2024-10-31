import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNurse } from "@/app/utils/addNurse";

interface NurseRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNurse: (nurseData: NurseFormData) => void;
}

type NurseFormData = {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  reg_no: string;
  sub_location: string;
  hospital: string;
  phone_number: string;
  gender: string;
};

interface Hospital {
  id: number;
  name: string;
}

interface Location {
  location: string;
  sub_location: string;
  village: string;
}

const ALLOWED_LOCATIONS = [
  { location: "Nairobi", sub_location: "Kibera", village: "Soweto East" },
  { location: "Nairobi", sub_location: "Mathare", village: "Mathare 4A" },
  { location: "Nairobi", sub_location: "Kibera", village: "Laini Saba" },
  { location: "Nairobi", sub_location: "Korogocho", village: "Highridge" },
  { location: "Nairobi", sub_location: "Kayole", village: "Soweto" },
  { location: "Nairobi", sub_location: "Dandora", village: "Phase 4" },
  { location: "Nairobi", sub_location: "Mukuru", village: "Mukuru Kwa Reuben" },
  { location: "Nairobi", sub_location: "Huruma", village: "Ngei 1" },
  { location: "Nairobi", sub_location: "Kawangware", village: "Stage 2" },
  { location: "Nairobi", sub_location: "Kamukunji", village: "Majengo" },
];

const phoneRegExp = /^(\+254|0)[1-9]\d{8}$/;

const nurseSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  reg_no: Yup.string().required("Registration number is required"),
  sub_location: Yup.string().required("Sub-location is required"),
  hospital: Yup.string().required("Hospital is required"),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
});

const NurseRegistrationForm: React.FC<NurseRegistrationFormProps> = ({ isOpen, onClose, onAddNurse }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get unique sub-locations
  const uniqueSubLocations = Array.from(new Set(ALLOWED_LOCATIONS.map(loc => loc.sub_location)));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NurseFormData>({
    resolver: yupResolver(nurseSchema),
  });

  const selectedSubLocation = watch("sub_location");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals`);
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const hospitalsList = await response.json();
        setHospitals(hospitalsList);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching hospitals');
      }
    };

    if (isOpen) {
      fetchHospitals();
    }
  }, [isOpen]);

  const onSubmit = async (data: NurseFormData) => {
    try {
      const selectedHospital = hospitals.find((hospital) => hospital.name === data.hospital);
      const locationData = ALLOWED_LOCATIONS.find(loc => loc.sub_location === data.sub_location);

      if (!selectedHospital || !locationData) {
        throw new Error("Invalid hospital or location selected.");
      }

      const nursePayload = {
        ...data,
        hospital_id: selectedHospital.id,
        location: locationData.location,
        village: locationData.village,
      };

      await addNurse(nursePayload);
      onAddNurse(nursePayload);
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while submitting the form');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-xl md:max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-left text-[#02A6A6]">
          Register Nurse
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            {/* Basic Information Fields */}
            {[
              { label: "Username", name: "username" as const },
              { label: "Email", name: "email" as const },
              { label: "Password", name: "password" as const },
              { label: "First Name", name: "firstname" as const },
              { label: "Last Name", name: "lastname" as const },
              { label: "Reg No", name: "reg_no" as const },
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

            {/* Sub-location Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-location <span className="text-red-500">*</span>
              </label>
              <select
                {...register("sub_location")}
                className={`border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-1 ${
                  errors.sub_location ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Sub-location</option>
                {uniqueSubLocations.map((subLocation) => (
                  <option key={subLocation} value={subLocation}>
                    {subLocation}
                  </option>
                ))}
              </select>
              {errors.sub_location && (
                <p className="text-red-500 text-xs mt-1">{errors.sub_location.message}</p>
              )}
            </div>

            {/* Village Display */}
            {selectedSubLocation && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Village
                </label>
                <input
                  type="text"
                  value={ALLOWED_LOCATIONS.find(loc => loc.sub_location === selectedSubLocation)?.village || ''}
                  disabled
                  className="border border-gray-300 rounded-md p-2 w-full text-sm bg-gray-50"
                />
              </div>
            )}

            {/* Hospital Dropdown */}
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
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.name}>
                    {hospital.name}
                  </option>
                ))}
              </select>
              {errors.hospital && (
                <p className="text-red-500 text-xs mt-1">{errors.hospital.message}</p>
              )}
            </div>

            {/* Gender Dropdown */}
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