
import React from 'react';
import { Mother, NextOfKin } from '../utils/types';
import { X } from 'lucide-react';

interface MotherDetailsModalProps {
  mother: Mother;
  nextOfKin: NextOfKin | null;
  onClose: () => void;
}

const MotherDetailsModal: React.FC<MotherDetailsModalProps> = ({ mother, nextOfKin, onClose }) => {
  const formattedDate = mother.date_of_reg ? new Date(mother.date_of_reg).toLocaleDateString() : "N/A"; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-out">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto transition-transform transform-gpu scale-95 sm:scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mother&apos;s Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Mother&apos;s Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-base text-gray-500">Full Name</p>
                <p className="text-2xl">{mother.first_name} {mother.last_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Village</p>
                <p className="text-2xl">{mother.village}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Marital Status</p>
                <p className="text-2xl">{mother.marital_status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-2xl">{mother.tel_no}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Number of Children</p>
                <p className="text-2xl">{mother.no_of_children}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="text-2xl">{formattedDate}</p>
              </div>
            </div>
          </div>
          
          {nextOfKin && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Next of Kin&apos;s Information</h3> 
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{nextOfKin.first_name} {nextOfKin.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="font-medium">{nextOfKin.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{nextOfKin.phone_number}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotherDetailsModal;

