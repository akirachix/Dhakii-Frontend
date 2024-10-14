"use client";
import React, { useState, useEffect } from "react";
import { useNurses } from "@/app/hooks/useNurses";
import NurseRegistrationForm from "@/app/components/NurseRegistration";
import NurseDetailsModal from "@/app/components/NurseDetails";
import { Nurse } from "@/app/utils/types";
import Sidebar from "../Sidebar";

const NurseList = () => {
  const { nurses, loading, error, currentPage, setCurrentPage, totalPages } =
    useNurses();

  const [filteredNurses, setFilteredNurses] = useState<Nurse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredNurses(nurses);
  }, [nurses]);

  const handleAddNurse = (newNurse: Nurse) => {
    setFilteredNurses((prevFiltered) => [newNurse, ...prevFiltered]);
    setShowModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = nurses.filter((nurse) =>
      `${nurse.firstname} ${nurse.lastname} ${nurse.sub_location}`
        .toLowerCase()
        .includes(query)
    );
    setFilteredNurses(filtered);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredNurses(nurses);
    setCurrentPage(1);
  };

  const handleNurseClick = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedNurse(null);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg">Loading nurses...</p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">Error fetching nurses: {error}</p>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-nunito">
      <div className="fixed top-0 left-0 h-full z-50 w-64">
        <Sidebar />
      </div>
      <div className="flex-1 ml-72 p-6 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">List of Nurses</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#F18721] hover:bg-[#E16701] text-white font-bold py-2 px-4 rounded-lg shadow-md text-sm"
            >
              + Add Nurse
            </button>
          </div>

          {/* Search */}
      {/* Add a button to clear the search */}
<div className="mb-6 flex space-x-2">
  <input
    type="text"
    placeholder="Search for a nurse"
    value={searchQuery}
    onChange={handleSearch}
    className="w-full px-4 py-2 outline-none text-gray-700 placeholder-gray-400 rounded-lg shadow-md text-sm"
  />
  <button
    onClick={handleClearSearch}
    className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-lg shadow-md text-sm"
  >
    Clear
  </button>
</div>


          {/* Nurse Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {filteredNurses.length > 0 ? (
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">First Name</th>
                    <th className="py-3 px-6 text-left">Last Name</th>
                    <th className="py-3 px-6 text-left">Sub-Location</th>
                    <th className="py-3 px-6 text-left">Reg No</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {filteredNurses.map((nurse, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleNurseClick(nurse)}
                    >
                      <td className="py-3 px-6">{nurse.firstname}</td>
                      <td className="py-3 px-6">{nurse.lastname}</td>
                      <td className="py-3 px-6">{nurse.sub_location}</td>
                      <td className="py-3 px-6">{nurse.reg_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-6 text-gray-500">No nurses found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === page
                    ? "bg-gray-300 text-gray-700"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* Modals */}
        {showModal && (
          <NurseRegistrationForm
            isOpen={showModal}
            onClose={handleCloseModal}
            onAddNurse={handleAddNurse}
          />
        )}
        {showDetailsModal && selectedNurse && (
          <NurseDetailsModal
            isOpen={showDetailsModal}
            onClose={handleCloseDetailsModal}
            nurse={selectedNurse}
          />
        )}
      </div>
    </div>
  );
};

export default NurseList;