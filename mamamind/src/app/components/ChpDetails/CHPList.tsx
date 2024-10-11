'use client';
import React, { useState } from 'react';

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
  registered_date: string;
  user: string;
}

interface CHPListProps {
  chps: CHP[];
  loading: boolean;
  currentPage: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
  onCHPClick: (chp: CHP) => void;
}

export const CHPList: React.FC<CHPListProps> = ({
  chps,
  loading,
  searchQuery,
  currentPage,
  onPageChange,
  onCHPClick,
}) => {
  const [selectedCHPId, setSelectedCHPId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(chps.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCHPs = chps.slice(startIndex, startIndex + itemsPerPage);

  // Function to handle row click event
  const handleRowClick = (chp: CHP) => {
    setSelectedCHPId(chp.id);
    onCHPClick(chp);
  };

  return (
    <div className="mt-8 px-4"> {/* Added padding to both sides */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading CHP list...</p>
      ) : chps.length === 0 && searchQuery.length > 0 ? (
        <p className="text-center text-gray-500 text-lg">No CHP with such details found on the list</p>
      ) : (
        <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-black uppercase text-sm leading-normal font-bold font-nunito">
              <th className="py-4 px-6 text-center border-b-2 border-gray-300 text-lg">First Name</th>
              <th className="py-4 px-6 text-center border-b-2 border-gray-300 text-lg">Last Name</th>
              <th className="py-4 px-6 text-center border-b-2 border-gray-300 text-lg">Village</th>
            </tr>
          </thead>
          <tbody className="text-black text-lg font-normal font-nunito">
            {currentCHPs.map((chp) => (
              <tr
                key={chp.id}
                className={`border-b-2 border-gray-300 hover:bg-gray-100 cursor-pointer ${
                  selectedCHPId === chp.id ? 'border-4 border-[#02A6A6]' : ''
                }`}
                onClick={() => handleRowClick(chp)}
              >
                <td className="py-4 px-6 text-center whitespace-nowrap">{chp.first_name}</td>
                <td className="py-4 px-6 text-center">{chp.last_name}</td>
                <td className="py-4 px-6 text-center">{chp.village}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {chps.length !== 0 && !loading && (
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


