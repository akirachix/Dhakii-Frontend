'use client';
import React, { useState, useEffect } from 'react';
import { CHPList } from '../components/ChpDetails/CHPList';
import { AddCHPModal } from '../components/ChpDetails/AddCHPModal';
import { Toast } from '../components/ChpDetails/Toast';
import { CHPDetailsModal } from '../components/ChpDetails/CHPDetailsModal'; 
import { useCHPs } from '@/app/hooks/useCHPs';

const CHPsPage = () => {
  const {
    filteredCHPs,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handleAddCHP,
  } = useCHPs();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCHP, setSelectedCHP] = useState<any | null>(null);
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

  const onAddCHP = async (chpData: any) => {
    try {
      await handleAddCHP(chpData);
      showToast('CHP added successfully', 'success');
    } catch (error) {
      console.error('Error adding CHP:', error);
      showToast('Failed to add CHP', 'error');
    }
  };

  const handleCHPClick = (chp: any) => {
    setSelectedCHP(chp);
    setShowDetailsModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-nunito">
      <div className="flex-1 overflow-hidden"> 
        <main className="p-8 h-full overflow-y-auto">
          <h3 className="text-gray-700 text-3xl font-medium mb-6">List of CHPs</h3>
          <div className="mb-6 flex justify-between items-center">
            <div className="relative w-1/3"> 
              <input
                type="text"
                placeholder="Search for a CHP"
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
              + Add CHP
            </button>
          </div>
          <CHPList
            chps={filteredCHPs}
            loading={loading}
            searchQuery={searchQuery} 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onCHPClick={handleCHPClick}
          />
        </main>
      </div>

      {showAddModal && (
        <AddCHPModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddCHP={onAddCHP}
        />
      )}

      {showDetailsModal && selectedCHP && (
        <CHPDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          chp={selectedCHP}
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

export default CHPsPage;


