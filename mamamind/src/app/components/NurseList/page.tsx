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
      <div className="fixed top-0 left-0 h-full z-50 w-56 bg-white">
        <Sidebar />
      </div>

      <div className="flex-grow p-6 ml-56 next-hub:p-10 next-hub-max:p-12 font-nunito bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Nurse Details</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            Add Nurse
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a nurse"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {filteredNurses.length > 0 ? (
            <table className="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-black uppercase text-lg lg:text-xl leading-normal font-bold">
                  <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">
                    First Name
                  </th>
                  <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">
                    Last Name
                  </th>
                  <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">
                    Sub-Location
                  </th>
                  <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg">
                    Reg No
                  </th>
                </tr>
              </thead>
              <tbody className="text-black text-lg font-normal font-nunito">
                {filteredNurses.map((nurse, index) => (
                  <tr
                    key={index}
                    className="border-b-2 border-gray-300 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNurseClick(nurse)}
                  >
                    <td className="py-4 px-6 text-left whitespace-nowrap">
                      {nurse.firstname}
                    </td>
                    <td className="py-4 px-6 text-left">{nurse.lastname}</td>
                    <td className="py-4 px-6 text-left">{nurse.sub_location}</td>
                    <td className="py-4 px-6 text-left">{nurse.reg_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-gray-500">No nurses found.</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
          >
            Back
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-2 px-3 py-1 ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-lg`}
            >
              {page}
            </button>
          ))}
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
          >
            Next
          </button>
        </div>

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




