'use client';
import React, { useState } from 'react';

interface AddCHPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCHP: (chpData: any) => void;
}

// Define the structure of formData with all necessary fields
interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  email: string;
  reg_no: string;
  location: string;
  sub_location: string;
  village: string;
  registered_date: string;
  user: string;
}

export const AddCHPModal: React.FC<AddCHPModalProps> = ({ isOpen, onClose, onAddCHP }) => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    username: '',
    phone_number: '',
    email: '',
    reg_no: '',
    location: '',
    sub_location: '',
    village: '',
    registered_date: '',
    user: ''
  });

  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // List of required fields to be validated
  const requiredFields: (keyof FormData)[] = [
    'first_name',
    'last_name',
    'username',
    'phone_number',
    'email',
    'reg_no',
    'location',
    'sub_location',
    'village',
    'registered_date',
    'user'
  ];

  // Handle form submission and validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the required field: ${field.replace('_', ' ')}`);
        return;
      }
    }

    onAddCHP(formData);
    onClose();
    setShowInviteModal(true); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-xl w-[900px]">
        <h2 className="text-2xl font-bold mb-6 text-left text-[#02A6A6]">Register CHP</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
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
                name="last_name"
                value={formData.last_name}
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
                Reg No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="reg_no"
                value={formData.reg_no}
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
                Village <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Registered Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="registered_date"
                value={formData.registered_date}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User ID of this CHP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
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



