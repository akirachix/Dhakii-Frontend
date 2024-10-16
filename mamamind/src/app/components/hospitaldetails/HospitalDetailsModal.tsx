'use client';

import { IoMdClose } from 'react-icons/io';

interface Hospital {
  name: string;
  type: string;
  village: string;
  hospital_location: string;
  sub_location: string;
  created_at: string;
}

interface HospitalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospital: Hospital;
}

export const HospitalDetailsModal: React.FC<HospitalDetailsModalProps> = ({ isOpen, onClose, hospital }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white p-6 sm:p-10 pt-16 pb-16 rounded-md shadow-xl w-[90%] max-w-[800px]">
        <IoMdClose
          className="absolute top-3 right-3 text-3xl cursor-pointer"
          onClick={onClose}
        />

        <h2 className="text-[28px] sm:text-[32px] font-bold mb-6 sm:mb-8 text-center text-[#02A6A6] font-nunito">
          Details of the Hospital
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-8 text-lg sm:text-xl font-nunito px-4 sm:px-10">
          <div>
            <p><strong>Hospital Name:</strong> {hospital.name}</p>
          </div>
          <div>
            <p><strong>Village:</strong> {hospital.village}</p>
          </div>
          <div>
            <p><strong>Type:</strong> {hospital.type}</p>
          </div>
          <div>
            <p><strong>Hospital Location:</strong> {hospital.hospital_location}</p>
          </div>
          <div>
            <p><strong>Created At:</strong> {new Date(hospital.created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <p><strong>Sub-Location:</strong> {hospital.sub_location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
 