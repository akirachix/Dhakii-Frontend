


"use client";
import React, { useState } from 'react';
import { MotherDetails, NextOfKinDetails } from '../utils/types';

interface MotherRegistrationFormProps {
  onSave: (motherDetails: MotherDetails, nextOfKinDetails: NextOfKinDetails) => void;
  onCancel: () => void;
}

const MotherRegistrationForm: React.FC<MotherRegistrationFormProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [motherDetails, setMotherDetails] = useState<MotherDetails>({
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
    mother_id: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({ api: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleMotherDetailsChange = (name: keyof MotherDetails, value: string) => {
    setMotherDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleNextOfKinDetailsChange = (name: keyof NextOfKinDetails, value: string) => {
    setNextOfKinDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await onSave(motherDetails, nextOfKinDetails);
        setErrors({ api: '' });
        setErrors({ api: 'An error occurred while saving the details.' });
    } finally {
        setIsLoading(false);
    }
};


  const handleCancel = () => {
    onCancel();
  };

  const renderInput = (
    name: keyof MotherDetails,
    label: string,
    value: string,
    onChange: (name: keyof MotherDetails, value: string) => void, 
    placeholder: string,
    type: string = 'text'
  ) => (
    <div>
      <label htmlFor={name.toString()} className="block mb-1">{label}</label>
      <input
        id={name.toString()}
        type={type}
        name={name.toString()}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder} 
        className={`w-full p-3 border-2 ${errors[name.toString()] ? 'border-red-500' : 'border-teal-500'} rounded-lg text-lg bg-white focus:outline-none focus:border-teal-700`}
      />
    </div>
  );

  const renderDropdown = (
    name: keyof MotherDetails, 
    label: string,
    value: string,
    onChange: (name: keyof MotherDetails, value: string) => void 
  ) => (
    <div>
      <label htmlFor={name.toString()} className="block mb-1">{label}</label>
      <select
        id={name.toString()}
        name={name.toString()}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border-teal-300 focus:border-teal-500 focus:outline-none rounded p-2"
      >
        <option value="">Select</option>
        <option value="married">Married</option>
        <option value="single">Single</option>
        <option value="divorced">Divorced</option>
        <option value="widowed">Widowed</option>
      </select>
    </div>
  );

  const renderNextOfKinInput = (
    name: keyof NextOfKinDetails, 
    label: string,
    value: string,
    onChange: (name: keyof NextOfKinDetails, value: string) => void
  ) => (
    <div>
      <label htmlFor={name.toString()} className="block mb-1">{label}</label>
      <input
        id={name.toString()}
        type="text"
        name={name.toString()}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`} 
        className={`w-full p-3 border-2 ${errors[name.toString()] ? 'border-red-500' : 'border-teal-500'} rounded-lg text-lg bg-white focus:outline-none focus:border-teal-700`}
      />
    </div>
  );

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50  text-xl flex items-center justify-center z-50">
      <div className="modal-container bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-teal-500">Mother Details</h2>
        <form onSubmit={step === 1 ? handleContinue : handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step === 1 ? (
              <>
                {renderInput('first_name', 'First Name', motherDetails.first_name, handleMotherDetailsChange, 'Enter first name')}
                {renderInput('last_name', 'Last Name', motherDetails.last_name, handleMotherDetailsChange, 'Enter last name')}
                {renderInput('date_of_birth', 'Date of Birth', motherDetails.date_of_birth, handleMotherDetailsChange, 'YYYY-MM-DD', 'date')}
                {renderInput('tel_no', 'Phone Number', motherDetails.tel_no, handleMotherDetailsChange, 'Enter phone number')}
                {renderDropdown('marital_status', 'Marital Status', motherDetails.marital_status, handleMotherDetailsChange)}
                {renderInput('no_of_children', 'Number of Children', motherDetails.no_of_children.toString(), handleMotherDetailsChange, 'Enter number of children', 'number')}
                {renderInput('village', 'Village', motherDetails.village, handleMotherDetailsChange, 'Enter your village')}
                {renderInput('sub_location', 'Sub Location', motherDetails.sub_location, handleMotherDetailsChange, 'Enter sub-location')}
              </>
            ) : (
              <>
                {renderNextOfKinInput('first_name', 'Next of Kin First Name', nextOfKinDetails.first_name, handleNextOfKinDetailsChange)}
                {renderNextOfKinInput('last_name', 'Next of Kin Last Name', nextOfKinDetails.last_name, handleNextOfKinDetailsChange)}
                {renderNextOfKinInput('relationship', 'Relationship', nextOfKinDetails.relationship, handleNextOfKinDetailsChange)}
                {renderNextOfKinInput('phone_number', 'Next of Kin Phone Number', nextOfKinDetails.phone_number, handleNextOfKinDetailsChange)}
              </>
            )}
          </div>
          {errors.api && <span className="text-red-500">{errors.api}</span>}
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500  text-xl text-white rounded">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-500  text-xl text-white rounded">{step === 1 ? 'Continue' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotherRegistrationForm;
