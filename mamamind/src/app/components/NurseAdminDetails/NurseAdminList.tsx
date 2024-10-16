'use client';
import React, { useState } from 'react';

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
  user: number;
}

interface NurseAdminListProps {
  nurseAdmins: NurseAdmin[];
  loading: boolean;
  currentPage: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
  onNurseAdminClick: (nurseAdmin: NurseAdmin) => void;
}

export const NurseAdminList: React.FC<NurseAdminListProps> = ({
  nurseAdmins,
  loading,
  searchQuery,
  currentPage,
  onPageChange,
  onNurseAdminClick,
}) => {
  const [selectedNurseAdminId, setSelectedNurseAdminId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(nurseAdmins.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNurseAdmins = nurseAdmins.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = (nurseAdmin: NurseAdmin) => {
    setSelectedNurseAdminId(nurseAdmin.id);
    onNurseAdminClick(nurseAdmin);
  };

  return (
    <div className="mt-8 px-4">
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading Nurse Admins...</p>
      ) : nurseAdmins.length === 0 && searchQuery.length > 0 ? (
        <p className="text-center text-gray-500 text-lg">No Nurse Admin found</p>
      ) : (
        <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-black uppercase text-sm leading-normal font-bold font-nunito">
              <th className="py-4 px-6 text-center border-b-2 border-gray-300 text-lg">Name</th>
              <th className="py-4 px-6 text-center border-b-2 border-gray-300 text-lg">Email</th>
              <th className="py-4 px-6 text-center border-b-2 border-gray-300 text-lg">Role</th>
            </tr>
          </thead>
          <tbody className="text-black text-lg font-normal font-nunito">
            {currentNurseAdmins.map((nurseAdmin) => (
              <tr
                key={nurseAdmin.id}
                className={`border-b-2 border-gray-300 hover:bg-gray-100 cursor-pointer ${
                  selectedNurseAdminId === nurseAdmin.id ? 'border-4 border-[#02A6A6]' : ''
                }`}
                onClick={() => handleRowClick(nurseAdmin)}
              >
                <td className="py-4 px-6 text-center whitespace-nowrap">{`${nurseAdmin.firstname} ${nurseAdmin.lastname}`}</td>
                <td className="py-4 px-6 text-center">{nurseAdmin.email}</td>
                <td className="py-4 px-6 text-center">Admin</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {nurseAdmins.length !== 0 && !loading && (
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

