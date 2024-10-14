"use client";
import React, { useState, useEffect } from "react";
import { useNurses } from "@/app/hooks/useNurses";
import NurseRegistrationForm from "@/app/components/NurseRegistration";
import NurseDetailsModal from "@/app/components/NurseDetails";
import { Nurse } from "@/app/utils/types";
import Sidebar from "../components/Sidebar";

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
    <div className="p-6 next-hub:p-10 next-hub-max:p-12 font-nunito bg-gray-50">
      <Sidebar />
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
          List of Nurses
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#F18721] hover:bg-[#E16701] text-white font-bold py-3 px-6 rounded-lg shadow-md mt-4 lg:mt-0 text-lg lg:text-xl"
        >
          + Add Nurse
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search for a nurse"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-3 w-full md:w-3/4 lg:w-2/3 next-hub:w-1/2 outline-none text-gray-700 placeholder-gray-400 rounded-lg shadow-md text-lg lg:text-xl"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md text-lg"
          >
            Back to Full List
          </button>
        )}
      </div>

      {/* Nurse Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {filteredNurses.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-black uppercase text-lg lg:text-xl leading-normal font-bold">
                <th className="py-4 px-6 text-center">First Name</th>
                <th className="py-4 px-6 text-center">Last Name</th>
                <th className="py-4 px-6 text-center">Sub-Location</th>
                <th className="py-4 px-6 text-center">Reg No</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-lg lg:text-xl">
              {filteredNurses.map((nurse, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleNurseClick(nurse)}
                >
                  <td className="py-4 px-6 text-center">{nurse.firstname}</td>
                  <td className="py-4 px-6 text-center">{nurse.lastname}</td>
                  <td className="py-4 px-6 text-center">
                    {nurse.sub_location}
                  </td>
                  <td className="py-4 px-6 text-center">{nurse.reg_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">No nurses found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-2 py-1 md:px-4 md:py-2 mx-1 rounded-lg text-lg lg:text-xl ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}
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
  );
};

export default NurseList;
