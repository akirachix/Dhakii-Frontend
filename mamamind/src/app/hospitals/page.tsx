'use client';

import React, { useState, useEffect } from 'react';
import { HospitalList } from '@/app/components/hospitaldetails/HospitalList';
import { AddHospitalModal } from '@/app/components/hospitaldetails/AddHospitalModal';
import { Toast } from '@/app/components/hospitaldetails/HospitalToast';
import { HospitalDetailsModal } from '@/app/components/hospitaldetails/HospitalDetailsModal';
import { useHospitals } from '@/app/hooks/useHospitals'; 
import { FormData } from '@/app/utils/hospitalTypes'; 
import { Hospital } from '../hooks/useGetHospitals'; 
import Sidebar from '../components/Sidebar';

const HospitalsPage = () => {
  const {
    filteredHospitals,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handleAddHospital,
  } = useHospitals();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 500); 
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000); 
  };

  const onAddHospital = async (hospitalData: FormData) => {
    try {
      await handleAddHospital(hospitalData);
      showToast('Hospital added successfully', 'success');
    } catch (error) {
      console.error('Error adding hospital:', error);
      showToast('Failed to add hospital', 'error');
    }
  };

  const handleHospitalClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowDetailsModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-nunito">
    <Sidebar />
    <div className="flex-1 ml-72 overflow-hidden"> {/* Adjusted to add margin-left for the sidebar */}
      <main className="p-8 h-full overflow-y-auto">
        <h3 className="text-gray-700 text-3xl font-medium mb-6">List of Hospitals</h3>
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search for a Hospital"
              className="bg-white border-2 border-gray-400 rounded-2xl pl-10 pr-4 py-3 shadow-md w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#F18721] hover:bg-[#E16701] text-white font-bold py-3 px-6 rounded-lg shadow-md"
          >
            + Add Hospital
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading hospital list...</p>
        ) : (
          <HospitalList
            hospitals={filteredHospitals}
            loading={loading}
            searchQuery={searchQuery}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onHospitalClick={handleHospitalClick}
          />
        )}
      </main>
    </div>
    {showAddModal && (
      <AddHospitalModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddHospital={onAddHospital}
      />
    )}
    {showDetailsModal && selectedHospital && (
      <HospitalDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        hospital={selectedHospital}
      />
    )}
    {toastMessage && (
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />
    )}
  </div>
  );
};

export default HospitalsPage;
