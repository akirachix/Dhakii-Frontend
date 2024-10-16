'use client';
import { IoMdClose } from 'react-icons/io';

interface NurseAdmin {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    phone_number: string;
    email: string;
    hospital_id: number;
    location: string;
    created_at: string;
    sub_location: string;
    user: number; // This is referencing the user who is the nurse admin
  }



interface NurseAdminDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nurseAdmin: NurseAdmin;
}

export const NurseAdminDetailsModal: React.FC<NurseAdminDetailsModalProps> = ({ isOpen, onClose, nurseAdmin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white p-10 pt-16 pb-16 rounded-md shadow-xl w-[1000px]">
        <IoMdClose
          className="absolute top-3 right-3 text-3xl cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-[32px] font-bold mb-8 text-center text-[#02A6A6] font-nunito">
          Details of the Nurse Admin
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-xl font-nunito px-10">
          <div>
            <p><strong>Full Name:</strong> {`${nurseAdmin.firstname} ${nurseAdmin.lastname}`}</p>
          </div>
          <div>
            <p><strong>Email:</strong> {nurseAdmin.email}</p>
          </div>
          <div>
            <p><strong>Phone Number:</strong> {nurseAdmin.phone_number}</p>
          </div>
          <div>
            <p><strong>Location:</strong> {nurseAdmin.location}</p>
          </div>
          <div>
            <p><strong>Sub-Location:</strong> {nurseAdmin.sub_location}</p>
          </div>
          <div>
            <p><strong>Hospital ID:</strong> {nurseAdmin.hospital_id}</p>
          </div>
          <div>
            <p><strong>Username:</strong> {nurseAdmin.username}</p>
          </div>
          <div>
            <p><strong>Registration Date:</strong> {new Date(nurseAdmin.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
