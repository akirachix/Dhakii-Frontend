"use client";
import React, { useState, useEffect } from 'react';
import { Mother } from '../utils/types'; 
import { Search, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { useMothers } from '../hooks/useMothers';
import MotherRegistrationForm from '../motherRegistrationForm';
import MotherDetailsModal from '../motherDetailModal';
import { fetchMotherById } from '../utils/fetchMotherbyId'; 
import Layout from '../Layout';

const MothersDetails = () => {
  const { mothers: initialMothers, loading: mothersLoading, error: mothersError } = useMothers();
  const [mothers, setMothers] = useState<Mother[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedMother, setSelectedMother] = useState<Mother | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mothersPerPage = 10;

  useEffect(() => {
    if (initialMothers) {
      setMothers(initialMothers);
    }
  }, [initialMothers]);

  const handleMotherClick = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const mother = await fetchMotherById(id); 
      setSelectedMother(mother);
      setIsDetailsModalOpen(true); 
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error("Error fetching mother data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMother(null);
  };

  const handleSave = (newMotherData: Mother) => {
    setMothers(prevMothers => [newMotherData, ...prevMothers]);
    setCurrentPage(1);
    setSearchTerm('');
    setIsRegistrationModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsRegistrationModalOpen(false);
  };

  // Define the `onMotherAdded` function
  const onMotherAdded = () => {
    // Close the modal after adding
    setIsRegistrationModalOpen(false); 
  };

  const filteredMothers = mothers.filter((mother) =>
    mother.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mother.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMothers.length / mothersPerPage);
  const startIndex = (currentPage - 1) * mothersPerPage;
  const currentMothers = filteredMothers.slice(startIndex, startIndex + mothersPerPage);

  return (
    <Layout>
      <div className="flex-1 overflow-hidden bg-gray-100 ml-64 p-4"> {/* Adjusting the layout */}
        <header className="bg-white">
          <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-800">Mothers&apos; Details</h1>
          </div>
        </header>

        <main className="mx-auto py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search for a mother"
                className="w-full pl-8 py-1.5 border border-teal-500 text-gray-600 rounded-md text-[14px] focus:outline-none focus:border-teal-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className="bg-[#F18721] text-white px-4 py-2 rounded-md hover:bg-orange-700 shadow-lg flex items-center text-base"
              onClick={() => setIsRegistrationModalOpen(true)}
            >
              <UserPlus className="mr-2" size={20} />
              Add Mother
            </button>
          </div>

          {isRegistrationModalOpen && (
            <MotherRegistrationForm
              onSave={handleSave}
              onCancel={handleCancel}
              onMotherAdded={onMotherAdded} // Pass the callback
            />
          )}

          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg">
                Loading...
              </div>
            </div>
          )}

          {error && (
            <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              {error}
            </div>
          )}

          {isDetailsModalOpen && selectedMother && (
            <MotherDetailsModal
              mother={selectedMother}
              onClose={handleCloseDetailsModal}
              nextOfKin={null}
            />
          )}

          <div className="bg-white shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['First Name', 'Last Name', 'Village', 'Marital Status'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xl font-bold text-gray-700 tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {mothersLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">Loading...</td>
                  </tr>
                ) : mothersError ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-red-500">{mothersError}</td>
                  </tr>
                ) : currentMothers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">No mothers found.</td>
                  </tr>
                ) : (
                  currentMothers.map((mother) => (
                    <tr 
                      key={mother.id} 
                      onClick={() => mother.id !== undefined && handleMotherClick(mother.id)} 
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-base">{mother.first_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-base">{mother.last_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-base">{mother.village}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-base">{mother.marital_status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filteredMothers.length > 0 && (
            <div className="flex items-center justify-end mt-4">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full text-teal-600 hover:bg-teal-100 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-4" />
                </button>
                <span className="text-sm font-medium">{currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-full text-teal-600 hover:bg-teal-100 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default MothersDetails;

