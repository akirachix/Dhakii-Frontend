'use client';
import React, { useState } from 'react';

interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  phone_number: string;
  email: string;
  location: string;
  sub_location: string;
  hospital_id: number; // Updated to match the correct type
  user: number; // Added user field
}

interface AddNurseAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNurseAdmin: (nurseAdminData: FormData) => void;
}

export const AddNurseAdminModal: React.FC<AddNurseAdminModalProps> = ({
  isOpen,
  onClose,
  onAddNurseAdmin,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    username: '',
    phone_number: '',
    email: '',
    location: '',
    sub_location: '',
    hospital_id: 0, // Changed to number
    user: 0, // User ID added
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requiredFields: (keyof FormData)[] = [
    'firstname',
    'lastname',
    'username',
    'phone_number',
    'email',
    'location',
    'sub_location',
    'hospital_id',
    'user', // Added user to required fields
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the required field: ${field.replace('_', ' ')}`);
        return;
      }
    }

    onAddNurseAdmin(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-xl w-[900px]">
        <h2 className="text-2xl font-bold mb-6 text-left text-[#02A6A6]">Register Nurse Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sub-Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sub_location"
                value={formData.sub_location}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hospital ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="hospital_id"
                value={formData.hospital_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#F18721] hover:bg-[#E16701] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



