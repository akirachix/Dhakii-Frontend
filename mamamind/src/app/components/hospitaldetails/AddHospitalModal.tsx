'use client';
import React, { useState } from 'react';
import { FormData } from '@/app/utils/hospitalTypes'; 

interface AddHospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHospital: (hospitalData: FormData) => void; 
}

export const AddHospitalModal: React.FC<AddHospitalModalProps> = ({ isOpen, onClose, onAddHospital }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: '',
    village: '',
    hospital_location: '',
    sub_location: '',
    created_at: '',
    updated_at: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requiredFields: (keyof FormData)[] = [
    'name',
    'type',
    'village',
    'hospital_location',
    'sub_location',
    'created_at',
    'updated_at'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the required field: ${field.replace('_', ' ')}`);
        return;
      }
    }

    onAddHospital(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-xl w-[90%] max-w-[900px]">
        <h2 className="text-2xl font-bold mb-6 text-left text-[#02A6A6]">Register Hospital</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-16 gap-y-4 sm:gap-y-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hospital Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
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
                Hospital Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hospital_location"
                value={formData.hospital_location}
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
                Created At <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="created_at"
                value={formData.created_at}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Updated At <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="updated_at"
                value={formData.updated_at}
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
