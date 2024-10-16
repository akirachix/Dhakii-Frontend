

'use client';

import React, { useState } from 'react';

interface Hospital {
  id: number;
  name: string;
  type: string;
  village: string;
  hospital_location: string;
  sub_location: string;
  created_at: string;
}

interface HospitalListProps {
  hospitals: Hospital[];
  loading: boolean;
  currentPage: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
  onHospitalClick: (hospital: Hospital) => void;
}

export const HospitalList: React.FC<HospitalListProps> = ({
  hospitals,
  loading,
  searchQuery,
  currentPage,
  onPageChange,
  onHospitalClick,
}) => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(hospitals.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHospitals = hospitals.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = (hospital: Hospital) => {
    setSelectedHospitalId(hospital.id);
    onHospitalClick(hospital);
  };

  return (
    <div className="mt-8 mx-2 lg:mx-4"> {/* Adjust the horizontal margin */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading hospital list...</p>
      ) : hospitals.length === 0 && searchQuery.length > 0 ? (
        <p className="text-center text-gray-500 text-lg">No hospital with such details found on the list</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-black uppercase text-sm leading-normal font-bold font-nunito">
                <th className="py-4 px-4 md:px-6 lg:px-16 text-left border-b-2 border-gray-300 text-lg">
                  Hospital Name
                </th>
                <th className="py-4 px-4 md:px-6 lg:px-16 text-left border-b-2 border-gray-300 text-lg">
                  Type
                </th>
                <th className="py-4 px-4 md:px-6 lg:px-16 text-left border-b-2 border-gray-300 text-lg">
                  Village
                </th>
              </tr>
            </thead>
            <tbody className="text-black text-lg font-normal font-nunito">
              {currentHospitals.map((hospital) => (
                <tr
                  key={hospital.id}
                  className={`border-b-2 border-gray-300 hover:bg-gray-50 cursor-pointer ${
                    selectedHospitalId === hospital.id ? 'border-4 border-[#02A6A6]' : ''
                  }`}
                  onClick={() => handleRowClick(hospital)}
                >
                  <td className="py-4 px-4 md:px-6 lg:px-16 text-left whitespace-nowrap">{hospital.name}</td>
                  <td className="py-4 px-4 md:px-6 lg:px-16 text-left whitespace-nowrap">{hospital.type}</td>
                  <td className="py-4 px-4 md:px-6 lg:px-16 text-left whitespace-nowrap">{hospital.village}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {hospitals.length !== 0 && !loading && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            Back
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
