"use client";
import React, { useState } from 'react';
import { Mother, MotherDetails, NextOfKinDetails } from '../utils/types';

import { useAddMother } from '../hooks/useAddMother'; // Hook to handle adding the mother
import { addNextOfKin } from '../utils/addNextOfKin'; // Util for adding Next of Kin

interface MotherRegistrationFormProps {
  onSave: (newMotherData: Mother) => void; // Prop to handle saving the mother
  onCancel: () => void;
  onMotherAdded: () => void; // A callback to refresh the list after saving the mother
}


const MotherRegistrationForm: React.FC<MotherRegistrationFormProps> = ({ onCancel, onMotherAdded }) => {
  const [step, setStep] = useState(1);
  const [motherDetails, setMotherDetails] = useState<MotherDetails>({
    id: undefined,  // Initialize `id` as undefined
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_reg: '',
    tel_no: '',
    marital_status: '',
    no_of_children: 0,
    village: '',
    sub_location: '',
  });
  const [nextOfKinDetails, setNextOfKinDetails] = useState<NextOfKinDetails>({
    first_name: '',
    last_name: '',
    relationship: '',
    phone_number: '',
    mother_id: 0, // Will be set after saving the mother
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({ api: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { handleAddMother } = useAddMother(); // Use the hook to add the mother

  // Handle mother detail input changes
  const handleMotherDetailsChange = (name: keyof MotherDetails, value: string) => {
    setMotherDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle next of kin detail input changes
  const handleNextOfKinDetailsChange = (name: keyof NextOfKinDetails, value: string) => {
    setNextOfKinDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Autogenerate registration date
      const currentDate = new Date().toISOString().split('T')[0];
      const motherDataWithRegDate: MotherDetails = { ...motherDetails, date_of_reg: currentDate };
  
      // Call hook to save the mother
      const savedMother = await handleAddMother(motherDataWithRegDate); // Now returns Mother | null
  
      if (savedMother && savedMother.id !== undefined) {
        // Set the mother ID in next of kin details (ensuring it is a valid number)
        setNextOfKinDetails((prevDetails) => ({
          ...prevDetails,
          mother_id: savedMother.id ?? 0, // Ensure this is a number, using `0` as a fallback
        }));
  
        setStep(2); // Proceed to next step (Next of Kin details)
      } else {
        setErrors({ api: 'Failed to save mother details. No valid ID returned.' });
      }
    } catch (error) {
      setErrors({ api: 'Failed to save mother details.' });
      console.error(error);
      
    } finally {
      setIsLoading(false);
    }
  };
  

  // Handle Save button for saving the next of kin details
  // Handle Save button for saving the next of kin details
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Disable the button after first click
  
    try {
      // Call API to save next of kin details
      await addNextOfKin(nextOfKinDetails);
  
      // Close the form and refresh the list of mothers
      onMotherAdded();
      setErrors({ api: '' });
    } catch (error) {
      setErrors({ api: 'Failed to save next of kin details.' });
      console.error('Error saving next of kin:', error);
    } finally {
      setIsLoading(false); // Enable the button again after saving
    }
  };
  


  // Cancel the form
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 text-xl flex items-center justify-center z-50">
      <div className="modal-container bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-teal-500">Mother Details</h2>
        <form onSubmit={step === 1 ? handleContinue : handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step === 1 ? (
              <>
                {/* Mother Details Form */}
                <div>
                  <label>First Name</label>
                  <input
                    type="text"
                    value={motherDetails.first_name}
                    onChange={(e) => handleMotherDetailsChange('first_name', e.target.value)}
                    placeholder="Enter first name"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={motherDetails.last_name}
                    onChange={(e) => handleMotherDetailsChange('last_name', e.target.value)}
                    placeholder="Enter last name"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={motherDetails.date_of_birth}
                    onChange={(e) => handleMotherDetailsChange('date_of_birth', e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={motherDetails.tel_no}
                    onChange={(e) => handleMotherDetailsChange('tel_no', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Marital Status</label>
                  <select
                    value={motherDetails.marital_status}
                    onChange={(e) => handleMotherDetailsChange('marital_status', e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
                <div>
                  <label>Number of Children</label>
                  <input
                    type="number"
                    value={motherDetails.no_of_children.toString()}
                    onChange={(e) => handleMotherDetailsChange('no_of_children', e.target.value)}
                    placeholder="Enter number of children"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Village</label>
                  <input
                    type="text"
                    value={motherDetails.village}
                    onChange={(e) => handleMotherDetailsChange('village', e.target.value)}
                    placeholder="Enter village"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Sub Location</label>
                  <input
                    type="text"
                    value={motherDetails.sub_location}
                    onChange={(e) => handleMotherDetailsChange('sub_location', e.target.value)}
                    placeholder="Enter sub-location"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Next of Kin Details Form */}
                <div>
                  <label>Next of Kin First Name</label>
                  <input
                    type="text"
                    value={nextOfKinDetails.first_name}
                    onChange={(e) => handleNextOfKinDetailsChange('first_name', e.target.value)}
                    placeholder="Enter next of kin's first name"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Next of Kin Last Name</label>
                  <input
                    type="text"
                    value={nextOfKinDetails.last_name}
                    onChange={(e) => handleNextOfKinDetailsChange('last_name', e.target.value)}
                    placeholder="Enter next of kin's last name"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Relationship</label>
                  <input
                    type="text"
                    value={nextOfKinDetails.relationship}
                    onChange={(e) => handleNextOfKinDetailsChange('relationship', e.target.value)}
                    placeholder="Enter relationship"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Next of Kin Phone Number</label>
                  <input
                    type="text"
                    value={nextOfKinDetails.phone_number}
                    onChange={(e) => handleNextOfKinDetailsChange('phone_number', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
              </>
            )}
          </div>
          {errors.api && <span className="text-red-500">{errors.api}</span>}
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500 text-xl text-white rounded">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-500 text-xl text-white rounded">{step === 1 ? 'Continue' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotherRegistrationForm;




