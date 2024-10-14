"use client";
import { IoMdClose } from "react-icons/io";
import { Nurse } from "@/app/utils/types"; 

interface NurseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nurse: Nurse;
}

const NurseDetailsModal: React.FC<NurseDetailsModalProps> = ({
  isOpen,
  onClose,
  nurse,
}) => {
  if (!isOpen) return null;

  console.log("Nurse details in modal: ", nurse); 

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white p-10 pt-16 pb-16 rounded-md shadow-xl w-[1000px]">
        <IoMdClose
          className="absolute top-3 right-3 text-3xl cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-[32px] font-bold mb-8 text-center text-[#02A6A6]">
          Details of the Nurse
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-xl">
          <div>
            <p>
              <strong>Full Name:</strong> {`${nurse.firstname || ''} ${nurse.lastname || ''}`.trim()}
            </p>
          </div>
          <div>
            <p>
              <strong>Reg No:</strong> {nurse.reg_no || ''}
            </p>
          </div>
          <div>
            <p>
              <strong>Sub-Location:</strong> {nurse.sub_location || ''}
            </p>
          </div>
          <div>
            <p>
              <strong>Phone Number:</strong> {nurse.phone_number || ''}
            </p>
          </div>
          <div>
            <p>
              <strong>Gender:</strong> {nurse.gender || ''}
            </p>
          </div>
          <div>
            <p>
              <strong>Email:</strong> {nurse.email || ''}
            </p>
          </div>
          <div>
            <p>
              <strong>Username:</strong> {nurse.username || ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseDetailsModal;
