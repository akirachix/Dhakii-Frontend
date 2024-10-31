// 'use client';
// import React, { useState } from 'react';

// interface CHP {
//   id: number;
//   first_name: string;
//   last_name: string;
//   village: string;
//   reg_no: string;
//   phone_number: string;
//   location: string;
//   sub_location: string;
//   email: string;
//   username: string;
//   registered_date: string;
//   user: string;
// }

// interface CHPListProps {
//   chps: CHP[];
//   loading: boolean;
//   currentPage: number;
//   searchQuery: string;
//   onPageChange: (page: number) => void;
//   onCHPClick: (chp: CHP) => void;
// }

// export const CHPList: React.FC<CHPListProps> = ({
//   chps,
//   loading,
//   searchQuery,
//   currentPage,
//   onPageChange,
//   onCHPClick,
// }) => {
//   const [selectedCHPId, setSelectedCHPId] = useState<number | null>(null);
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(chps.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentCHPs = chps.slice(startIndex, startIndex + itemsPerPage);

//   // Function to handle row click event
//   const handleRowClick = (chp: CHP) => {
//     setSelectedCHPId(chp.id);
//     onCHPClick(chp);
//   };

//   return (
//     <div className="mt-8 px-4">
//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">Loading CHP list...</p>
//       ) : chps.length === 0 && searchQuery.length > 0 ? (
//         <p className="text-center text-gray-500 text-lg">No CHP with such details found on the list</p>
//       ) : (
//         <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-gray-100 text-black uppercase text-sm leading-normal font-bold font-nunito">
//               <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">First Name</th>
//               <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">Last Name</th>
//               <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">Village</th>
//             </tr>
//           </thead>
//           <tbody className="text-black text-lg font-normal font-nunito">
//             {currentCHPs.map((chp) => (
//               <tr
//                 key={chp.id}
//                 className={`border-b-2 border-gray-300 hover:bg-gray-100 cursor-pointer ${
//                   selectedCHPId === chp.id ? 'border-4 border-[#02A6A6]' : ''
//                 }`}
//                 onClick={() => handleRowClick(chp)}
//               >
//                 <td className="py-4 px-6 text-left whitespace-nowrap">{chp.first_name}</td>
//                 <td className="py-4 px-6 text-left">{chp.last_name}</td>
//                 <td className="py-4 px-6 text-left">{chp.village}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {chps.length !== 0 && !loading && (
//         <div className="flex justify-end mt-4 pr-4">
//           <button
//             onClick={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md text-base disabled:opacity-50"
//           >
//             Back
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => onPageChange(page)}
//               className={`px-4 py-2 mx-1 rounded-md text-base ${
//                 currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             onClick={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md text-base disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };




// 'use client';
// import React, { useState, useEffect } from 'react';

// // Define interfaces for mothers and CHPs
// interface Mother {
//   id: number;
//   hospital: number;
//   chp: number | null;
// }

// interface CHP {
//   id: number;
//   first_name: string;
//   last_name: string;
//   village: string;
//   reg_no: string;
//   phone_number: string;
//   location: string;
//   sub_location: string;
//   email: string;
//   username: string;
//   user: string;
//   hospital: string;
//   no_of_mothers: number;
// }

// interface CHPListProps {
//   chps: CHP[];
//   mothers: Mother[];
//   loading: boolean;
//   currentPage: number;
//   searchQuery: string;
//   onPageChange: (page: number) => void;
//   onCHPClick: (chp: CHP) => void;
//   newlyRegisteredCHP?: CHP; 
// }

// const ALLOWED_LOCATIONS = [
//   { location: "Nairobi", sub_location: "Kibera", village: "Soweto East" },
//   { location: "Nairobi", sub_location: "Mathare", village: "Mathare 4A" },
//   { location: "Nairobi", sub_location: "Kibera", village: "Laini Saba" },
//   { location: "Nairobi", sub_location: "Korogocho", village: "Highridge" },
//   { location: "Nairobi", sub_location: "Kayole", village: "Soweto" },
//   { location: "Nairobi", sub_location: "Dandora", village: "Phase 4" },
//   { location: "Nairobi", sub_location: "Mukuru", village: "Mukuru Kwa Reuben" },
//   { location: "Nairobi", sub_location: "Huruma", village: "Ngei 1" },
//   { location: "Nairobi", sub_location: "Kawangware", village: "Stage 2" },
//   { location: "Nairobi", sub_location: "Kamukunji", village: "Majengo" },
// ];

// export const CHPList: React.FC<CHPListProps> = ({
//   chps,
//   mothers,
//   loading,
//   searchQuery,
//   currentPage,
//   onPageChange,
//   onCHPClick,
//   newlyRegisteredCHP,
// }) => {
//   const [selectedCHPId, setSelectedCHPId] = useState<number | null>(null);
//   const itemsPerPage = 10;

//   const updatedCHPs = newlyRegisteredCHP ? [newlyRegisteredCHP, ...chps] : chps;

//   const filteredCHPs = updatedCHPs.filter((chp) =>
//     ALLOWED_LOCATIONS.some(
//       (loc) =>
//         loc.location === chp.location &&
//         loc.sub_location === chp.sub_location &&
//         loc.village === chp.village
//     )
//   );

//   const totalPages = Math.ceil(filteredCHPs.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentCHPs = filteredCHPs.slice(startIndex, startIndex + itemsPerPage);

//   const chpsWithMothersCount = currentCHPs.map((chp) => {
//     const motherCount = mothers
//       ? mothers.filter(
//           (mother) => mother.hospital === parseInt(chp.hospital) && mother.chp === chp.id
//         ).length
//       : 0; 

//     return { ...chp, no_of_mothers: motherCount };
//   });

//   const handleRowClick = (chp: CHP) => {
//     setSelectedCHPId(chp.id);
//     onCHPClick(chp);
//   };

//   return (
//     <div className="mt-8 px-4">
//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">Loading CHP list...</p>
//       ) : filteredCHPs.length === 0 && searchQuery.length > 0 ? (
//         <p className="text-center text-gray-500 text-lg">No CHP with such details found on the list</p>
//       ) : (
//         <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-gray-100 text-black uppercase text-sm leading-normal font-bold font-nunito">
//               <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">First Name</th>
//               <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">Last Name</th>
//               <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">Village</th>
//               <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">No of Mothers</th>
//             </tr>
//           </thead>
//           <tbody className="text-black text-lg font-normal font-nunito">
//             {chpsWithMothersCount.map((chp) => (
//               <tr
//                 key={chp.id}
//                 className={`border-b-2 border-gray-300 hover:bg-gray-100 cursor-pointer ${
//                   selectedCHPId === chp.id ? 'border-4 border-[#02A6A6]' : ''
//                 }`}
//                 onClick={() => handleRowClick(chp)}
//               >
//                 <td className="py-4 px-6 text-left whitespace-nowrap">{chp.first_name}</td>
//                 <td className="py-4 px-6 text-left">{chp.last_name}</td>
//                 <td className="py-4 px-6 text-left">{chp.village}</td>
//                 <td className="py-4 px-6 text-left">{chp.no_of_mothers}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {filteredCHPs.length !== 0 && !loading && (
//         <div className="flex justify-end mt-4 pr-4">
//           <button
//             onClick={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md text-base disabled:opacity-50"
//           >
//             Back
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => onPageChange(page)}
//               className={`px-4 py-2 mx-1 rounded-md text-base ${
//                 currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             onClick={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md text-base disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };




'use client';
import React, { useState, useEffect } from 'react';

// Define interfaces for mothers and CHPs
interface Mother {
  id: number;
  hospital: number;
  chp: number | null;
}

interface CHP {
  id: number;
  first_name: string;
  last_name: string;
  village: string;
  reg_no: string;
  phone_number: string;
  location: string;
  sub_location: string;
  email: string;
  username: string;
  user: string;
  hospital: string;
  no_of_mothers: number;
}

interface CHPListProps {
  chps: CHP[];
  mothers: Mother[];
  loading: boolean;
  currentPage: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
  onCHPClick: (chp: CHP) => void;
  newlyRegisteredCHP?: CHP;
}

// Define allowed locations for filtering
const ALLOWED_LOCATIONS = [
  { location: "Nairobi", sub_location: "Kibera", village: "Soweto East" },
  { location: "Nairobi", sub_location: "Mathare", village: "Mathare 4A" },
  { location: "Nairobi", sub_location: "Kibera", village: "Laini Saba" },
  { location: "Nairobi", sub_location: "Korogocho", village: "Highridge" },
  { location: "Nairobi", sub_location: "Kayole", village: "Soweto" },
  { location: "Nairobi", sub_location: "Dandora", village: "Phase 4" },
  { location: "Nairobi", sub_location: "Mukuru", village: "Mukuru Kwa Reuben" },
  { location: "Nairobi", sub_location: "Huruma", village: "Ngei 1" },
  { location: "Nairobi", sub_location: "Kawangware", village: "Stage 2" },
  { location: "Nairobi", sub_location: "Kamukunji", village: "Majengo" },
];

export const CHPList: React.FC<CHPListProps> = ({
  chps,
  mothers,
  loading,
  searchQuery,
  currentPage,
  onPageChange,
  onCHPClick,
  newlyRegisteredCHP,
}) => {
  const [selectedCHPId, setSelectedCHPId] = useState<number | null>(null);
  const itemsPerPage = 10;

  // Add newly registered CHP to the top of the list
  let updatedCHPs = chps;
  if (newlyRegisteredCHP) {
    updatedCHPs = [newlyRegisteredCHP, ...chps];
  }

  // Sort CHPs to ensure the most recently added is at the top
  const sortedCHPs = updatedCHPs.sort((a, b) => b.id - a.id);

  // Filter CHPs based on allowed locations
  const filteredCHPs = sortedCHPs.filter((chp) =>
    ALLOWED_LOCATIONS.some(
      (loc) =>
        loc.location === chp.location &&
        loc.sub_location === chp.sub_location &&
        loc.village === chp.village
    )
  );

  const totalPages = Math.ceil(filteredCHPs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCHPs = filteredCHPs.slice(startIndex, startIndex + itemsPerPage);

  // Calculate the number of mothers assigned to each CHP based on the same hospital
  const chpsWithMothersCount = currentCHPs.map((chp) => {
    const motherCount = mothers
      ? mothers.filter(
          (mother) => mother.hospital === parseInt(chp.hospital) && mother.chp === chp.id
        ).length
      : 0; 

    return { ...chp, no_of_mothers: motherCount };
  });

  
  const handleRowClick = (chp: CHP) => {
    setSelectedCHPId(chp.id);
    onCHPClick(chp);
  };

  return (
    <div className="mt-8 px-4">
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading CHP list...</p>
      ) : filteredCHPs.length === 0 && searchQuery.length > 0 ? (
        <p className="text-center text-gray-500 text-lg">No CHP with such details found on the list</p>
      ) : (
        <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-black uppercase text-sm leading-normal font-bold font-nunito">
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">First Name</th>
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">Last Name</th>
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">Village</th>
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">No of Mothers</th>
            </tr>
          </thead>
          <tbody className="text-black text-lg font-normal font-nunito">
            {chpsWithMothersCount.map((chp) => (
              <tr
                key={chp.id}
                className={`border-b-2 border-gray-300 hover:bg-gray-100 cursor-pointer ${
                  selectedCHPId === chp.id ? 'border-4 border-[#02A6A6]' : ''
                }`}
                onClick={() => handleRowClick(chp)}
              >
                <td className="py-4 px-6 text-left whitespace-nowrap">{chp.first_name}</td>
                <td className="py-4 px-6 text-left">{chp.last_name}</td>
                <td className="py-4 px-6 text-left">{chp.village}</td>
                <td className="py-4 px-6 text-left">{chp.no_of_mothers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {filteredCHPs.length !== 0 && !loading && (
        <div className="flex justify-end mt-4 pr-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md text-base disabled:opacity-50"
          >
            Back
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 mx-1 rounded-md text-base ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md text-base disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
