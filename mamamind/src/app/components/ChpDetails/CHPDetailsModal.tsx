'use client';

import { IoMdClose } from 'react-icons/io';

interface CHP {
  first_name: string;
  last_name: string;
  village: string;
  reg_no: string;
  phone_number: string;
  location: string;
  sub_location: string;
  registered_date: string;
  email: string;
}

interface CHPDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chp: CHP;
}

export const CHPDetailsModal: React.FC<CHPDetailsModalProps> = ({ isOpen, onClose, chp }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white p-10 pt-16 pb-16 rounded-md shadow-xl w-[1000px]"> {/* Adjusted padding for top and bottom */}
        <IoMdClose
          className="absolute top-3 right-3 text-3xl cursor-pointer"
          onClick={onClose}
        />

        <h2 className="text-[32px] font-bold mb-8 text-center text-[#02A6A6] font-nunito">
          Details of the CHP
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-xl font-nunito px-10"> {/* Further reduced gap and increased padding */}
          <div>
            <p><strong>Full Name:</strong> {`${chp.first_name} ${chp.last_name}`}</p>
          </div>
          <div>
            <p><strong>Village:</strong> {chp.village}</p>
          </div>
          <div>
            <p><strong>Reg No:</strong> {chp.reg_no}</p>
          </div>
          <div>
            <p><strong>Telephone Number:</strong> {chp.phone_number}</p>
          </div>
          <div>
            <p><strong>Location:</strong> {chp.location}</p>
          </div>
          <div>
            <p><strong>Registration Date:</strong> {new Date(chp.registered_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p><strong>Sublocation:</strong> {chp.sub_location}</p>
          </div>
          <div>
            <p><strong>Email:</strong> {chp.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
