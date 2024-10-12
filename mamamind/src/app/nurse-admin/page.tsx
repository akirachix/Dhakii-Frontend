'use client';
import React, { useState, useEffect } from 'react';
import { NurseAdminList } from '../components/NurseAdminDetails/NurseAdminList';
import { AddNurseAdminModal } from '../components/NurseAdminDetails/AddNurseAdminModal';
import { Toast } from '../components/NurseAdminDetails/Toast';
import { NurseAdminDetailsModal } from '../components/NurseAdminDetails/NurseAdminDetailsModal';
import { useNurseAdmins } from '@/app/hooks/useNurseAdmins';
import { FormData } from '@/app/utils/nurseAdmin';
import { NurseAdmin } from '../hooks/useGetNurseAdminData';
import Sidebar from '../components/Sidebar';


const NurseAdminsPage = () => {
  const {
    filteredNurseAdmins,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handleAddNurseAdmin,
  } = useNurseAdmins();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNurseAdmin, setSelectedNurseAdmin] = useState<NurseAdmin | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 1000);
  };

  const onAddNurseAdmin = async (nurseAdminData: FormData) => {
    try {
      await handleAddNurseAdmin(nurseAdminData);
      showToast('Nurse Admin added successfully', 'success');
    } catch (error) {
      console.error('Error adding Nurse Admin:', error);
      showToast('Failed to add Nurse Admin', 'error');
    }
  };

  const handleNurseAdminClick = (nurseAdmin: NurseAdmin) => {
    setSelectedNurseAdmin(nurseAdmin);
    setShowDetailsModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-nunito">
      <Sidebar />
      <div className="ml-72 flex-1 overflow-hidden">  
        <main className="p-8 h-full overflow-y-auto">
          <h3 className="text-gray-700 text-3xl font-medium mb-6">List of Nurse Admins</h3>
          <div className="mb-6 flex justify-between items-center">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search for a Nurse Admin"
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
              + Add Nurse Admin
            </button>
          </div>

          <NurseAdminList
            nurseAdmins={filteredNurseAdmins}
            loading={loading}
            searchQuery={searchQuery}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onNurseAdminClick={handleNurseAdminClick}
          />
        </main>
      </div>

      {showAddModal && (
        <AddNurseAdminModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddNurseAdmin={onAddNurseAdmin}
        />
      )}

      {showDetailsModal && selectedNurseAdmin && (
        <NurseAdminDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          nurseAdmin={selectedNurseAdmin}
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

export default NurseAdminsPage;
