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

// Define the form data type aligned with the schema
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

// Define interfaces for API responses
interface Location {
  id: number;
  name: string;
}

interface Hospital {
  id: number;
  name: string;
}

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
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NurseFormData>({
    resolver: yupResolver(nurseSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch locations
        const locationsResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/locations/');
        if (!locationsResponse.ok) {
          throw new Error('Failed to fetch locations');
        }
        const locationsList = await locationsResponse.json();
        setLocations(locationsList);

        // Fetch hospitals
        const hospitalsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals`);
        if (!hospitalsResponse.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const hospitalsList = await hospitalsResponse.json();
        setHospitals(hospitalsList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const onSubmit = async (data: NurseFormData) => {
    try {
      const selectedHospital = hospitals.find((hospital) => hospital.name === data.hospital);
      const selectedLocation = locations.find((location) => location.name === data.sub_location);

      if (!selectedHospital || !selectedLocation) {
        throw new Error("Invalid hospital or location selected.");
      }

      const nursePayload = {
        ...data,
        hospital_id: selectedHospital.id,
        location_id: selectedLocation.id,
      };

      await addNurse(nursePayload);
      onAddNurse(nursePayload);
      reset(); // Reset form after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while submitting the form');
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-xl">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.sub_location && (
                <p className="text-red-500 text-xs mt-1">{errors.sub_location.message}</p>
              )}
            </div>

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