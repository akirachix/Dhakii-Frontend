"use client";
import React, { useState, useEffect } from 'react';
import { Mother, NextOfKin } from '../utils/types';
import { Search, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { useMothers } from '../hooks/useMothers';
import MotherRegistrationForm from '../motherRegistrationForm';
import { fetchMotherWithNextOfKin } from '../utils/fetchMotherWithNextOfKin';
import MotherDetailsModal from '../motherDetailModal';

const MothersDetails = () => {
  const { mothers: initialMothers, loading: mothersLoading, error: mothersError } = useMothers();
  const [mothers, setMothers] = useState<Mother[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedMother, setSelectedMother] = useState<Mother | null>(null);
  const [selectedNextOfKin, setSelectedNextOfKin] = useState<NextOfKin | null>(null);
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
      
      const { mother, nextOfKin } = await fetchMotherWithNextOfKin(id);
      
      setSelectedMother(mother);
      setSelectedNextOfKin(nextOfKin);
      setIsDetailsModalOpen(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error("Error fetching mother and kin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMother(null);
    setSelectedNextOfKin(null);
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

  const filteredMothers = mothers.filter((mother) =>
    mother.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mother.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMothers.length / mothersPerPage);
  const startIndex = (currentPage - 1) * mothersPerPage;
  const currentMothers = filteredMothers.slice(startIndex, startIndex + mothersPerPage);

  return (
    <div className="flex-1 overflow-hidden bg-gray-100 w-full">
    <header className="bg-white">
      <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800">Mothers' Details</h1>
      </div>
    </header>
  
    <main className="mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for a mother"
            className="w-full pl-10 py-2 border-2 border-teal-500 text-gray-600 rounded-md focus:outline-none focus:border-teal-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
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
          nextOfKin={selectedNextOfKin}
          onClose={handleCloseDetailsModal}
        />
      )}
  
      <div className="bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['First Name', 'Last Name', 'Village', 'Marital Status'].map((header) => (
                <th
                  key={header}
                  className="px-8 py-4 text-left text-lg font-bold text-gray-700 tracking-wider"
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
                  onClick={() => handleMotherClick(mother.id)} 
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="px-8 py-4 whitespace-nowrap">{mother.first_name}</td>
                  <td className="px-8 py-4 whitespace-nowrap">{mother.last_name}</td>
                  <td className="px-8 py-4 whitespace-nowrap">{mother.village}</td>
                  <td className="px-8 py-4 whitespace-nowrap">{mother.marital_status}</td>
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
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-lg font-medium">{currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full text-teal-600 hover:bg-teal-100 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </main>
  </div>
  
  );
};

export default MothersDetails;

