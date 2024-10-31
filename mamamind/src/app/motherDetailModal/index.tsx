
// import React from 'react';
// import { Mother, NextOfKin } from '../utils/types';
// import { X } from 'lucide-react';

// interface MotherDetailsModalProps {
//   mother: Mother;
//   nextOfKin: NextOfKin | null;
//   onClose: () => void;
// }

// const MotherDetailsModal: React.FC<MotherDetailsModalProps> = ({ mother, nextOfKin, onClose }) => {
//   const formattedDate = mother.date_of_reg ? new Date(mother.date_of_reg).toLocaleDateString() : "N/A"; 

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-out">
//       <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto transition-transform transform-gpu scale-95 sm:scale-100">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Mother&apos;s Details</h2>
//           <button 
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full"
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
//         </div>
        
//         <div className="space-y-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Mother&apos;s Information</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-base text-gray-500">Full Name</p>
//                 <p className="text-2xl">{mother.first_name} {mother.last_name}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Village</p>
//                 <p className="text-2xl">{mother.village}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Marital Status</p>
//                 <p className="text-2xl">{mother.marital_status}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Phone Number</p>
//                 <p className="text-2xl">{mother.tel_no}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Number of Children</p>
//                 <p className="text-2xl">{mother.no_of_children}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Registration Date</p>
//                 <p className="text-2xl">{formattedDate}</p>
//               </div>
//             </div>
//           </div>
          
//           {nextOfKin && (
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Next of Kin&apos;s Information</h3> 
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Full Name</p>
//                   <p className="font-medium">{nextOfKin.first_name} {nextOfKin.last_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Relationship</p>
//                   <p className="font-medium">{nextOfKin.relationship}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone Number</p>
//                   <p className="font-medium">{nextOfKin.phone_number}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MotherDetailsModal;

import React, { useEffect, useState } from 'react';
import { Mother, NextOfKin } from '../utils/types';
import { X } from 'lucide-react';
import { fetchNextOfKinByMotherId } from '../utils/fetchNextOfKinById';

interface MotherDetailsModalProps {
  mother: Mother;
  onClose: () => void;
}

const MotherDetailsModal: React.FC<MotherDetailsModalProps> = ({ mother, onClose }) => {
  const [nextOfKin, setNextOfKin] = useState<NextOfKin[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadNextOfKin = async () => {
      setIsLoading(true);
      try {
        const fetchedKin = await fetchNextOfKinByMotherId(mother.id);
        setNextOfKin(fetchedKin);
      } catch (error) {
        console.error('Error fetching next of kin:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (mother.id) {
      loadNextOfKin();
    }
  }, [mother.id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-600">{mother.first_name} {mother.last_name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg">{mother.tel_no}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Children</p>
              <p className="text-lg">{mother.no_of_children}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-lg">{mother.date_of_birth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">PPD Status</p>
              <p className="text-lg">{mother.status === 0 ? 'Negative' : 'Positive'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Marital Status</p>
              <p className="text-lg">{mother.marital_status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Assigned CHP</p>
              <p className="text-lg">{mother.chp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Village</p>
              <p className="text-lg">{mother.village}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Sub-Location</p>
              <p className="text-lg">{mother.sub_location}</p>
            </div>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Loading Next of Kin...</p>
          ) : nextOfKin && nextOfKin.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Next of Kin Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {nextOfKin.map((kin, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg">{kin.first_name} {kin.last_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Relationship</p>
                      <p className="text-lg">{kin.relationship}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-lg">{kin.phone_number}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No next of kin details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotherDetailsModal;
