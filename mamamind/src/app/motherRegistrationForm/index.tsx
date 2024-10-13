

// "use client";
// import React, { useState } from 'react';
// import * as Yup from 'yup';
// import { addMother } from '@/app/utils/addMother';
// import { addNextOfKin } from '@/app/utils/addNextOfKin';

// interface Mother {
//   id?: number;
//   first_name: string;
//   last_name: string;
//   date_of_birth: string;
//   tel_no: string;
//   marital_status: string;
//   no_of_children: number;
//   village: string;
//   sub_location: string;
//   date_of_reg?: string;
// }

// interface NextOfKin {
//   id?: number;
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   relationship: string;
//   mother_id: number;
// }

// interface FormData {
//   motherDetails: Mother;
//   nextOfKin: NextOfKin;
// }

// interface MotherRegistrationFormProps {
//   onSave: (data: FormData) => void;
//   onCancel: () => void;
// }

// const phoneRegExp = /^(\+254|0)[1-9]\d{8}$/;

// const motherDetailsSchema = Yup.object().shape({
//   first_name: Yup.string().required('First name is required'),
//   last_name: Yup.string().required('Last name is required'),
//   date_of_birth: Yup.date()
//     .required('Date of birth is required')
//     .max(new Date(), 'Date of birth cannot be in the future')
//     .test('is-adult', 'Mother must be at least 18 years old', function (value) {
//       return value && new Date().getFullYear() - new Date(value).getFullYear() >= 18;
//     }),
//   tel_no: Yup.string()
//     .matches(phoneRegExp, 'Phone number is not valid')
//     .required('Phone number is required'),
//   marital_status: Yup.string().required('Marital status is required'),
//   no_of_children: Yup.number()
//     .typeError('Number of children must be a number')
//     .min(0, 'Number of children cannot be negative')
//     .required('Number of children is required'),
//   village: Yup.string().required('Village is required'),
//   sub_location: Yup.string().required('Sub location is required'),
// });

// const nextOfKinSchema = Yup.object().shape({
//   first_name: Yup.string().required('First name is required'),
//   last_name: Yup.string().required('Last name is required'),
//   relationship: Yup.string().required('Relationship is required'),
//   phone_number: Yup.string()
//     .matches(phoneRegExp, 'Phone number is not valid')
//     .required('Phone number is required'),
// });

// const MotherRegistrationForm: React.FC<MotherRegistrationFormProps> = ({ onSave, onCancel }) => {
//   const [step, setStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [motherDetails, setMotherDetails] = useState<Omit<Mother, 'id' | 'date_of_reg'>>({
//     first_name: '',
//     last_name: '',
//     date_of_birth: '',
//     tel_no: '',
//     marital_status: '',
//     no_of_children: 0,
//     village: '',
//     sub_location: ''
//   });
//   const [nextOfKinDetails, setNextOfKinDetails] = useState<NextOfKin>({
//     first_name: '',
//     last_name: '',
//     relationship: '',
//     phone_number: '',
//     mother_id: 0,
//   });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const resetForm = () => {
//     setMotherDetails({
//       first_name: '',
//       last_name: '',
//       date_of_birth: '',
//       tel_no: '',
//       marital_status: '',
//       no_of_children: 0,
//       village: '',
//       sub_location: ''
//     });
//     setNextOfKinDetails({
//       first_name: '',
//       last_name: '',
//       relationship: '',
//       phone_number: '',
//       mother_id: 0,
//     });
//     setErrors({});
//     setStep(1);
//   };

//   const handleMotherDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setMotherDetails(prev => ({
//       ...prev,
//       [name]: name === 'no_of_children' ? parseInt(value) || 0 : value
//     }));
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleNextOfKinDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNextOfKinDetails(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = async (schema: Yup.ObjectSchema<any>, data: any) => {
//     try {
//       await schema.validate(data, { abortEarly: false });
//       setErrors({});
//       return true;
//     } catch (yupError) {
//       if (yupError instanceof Yup.ValidationError) {
//         const errorMessages: { [key: string]: string } = {};
//         yupError.inner.forEach((error) => {
//           if (error.path) {
//             errorMessages[error.path] = error.message;
//           }
//         });
//         setErrors(errorMessages);
//       }
//       return false;
//     }
//   };

//   const handleContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLoading) return;

//     setIsLoading(true);
//     setErrors({});

//     try {
//       const motherDetailsWithDate = {
//         ...motherDetails,
//         date_of_reg: new Date().toISOString().split('T')[0],
//       };

//       const isValid = await validateForm(motherDetailsSchema, motherDetailsWithDate);
//       if (!isValid) {
//         setIsLoading(false);
//         return;
//       }

//       const addedMother = await addMother(motherDetailsWithDate);

//       if (!addedMother || !addedMother.id) {
//         throw new Error('Failed to get mother ID from server');
//       }

//       setNextOfKinDetails(prev => ({
//         ...prev,
//         mother_id: addedMother.id!
//       }));

//       setStep(2);

//     } catch (error: any) {
//       setErrors(prev => ({
//         ...prev,
//         api: error.message || 'Failed to add mother. Please try again.'
//       }));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLoading) return;

//     setIsLoading(true);
//     setErrors({});

//     try {
//       const isValid = await validateForm(nextOfKinSchema, nextOfKinDetails);
//       if (!isValid) {
//         setIsLoading(false);
//         return;
//       }

//       const addedNextOfKin = await addNextOfKin(nextOfKinDetails);

//       onSave({
//         motherDetails: {
//           ...motherDetails,
//           id: nextOfKinDetails.mother_id,
//           date_of_reg: new Date().toISOString().split('T')[0]
//         },
//         nextOfKin: addedNextOfKin
//       });

//       resetForm();
//       onCancel();

//     } catch (error: any) {
//       setErrors(prev => ({
//         ...prev,
//         api: error.message || 'Failed to save next of kin. Please try again.'
//       }));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     resetForm();
//     onCancel();
//   };

//   const renderInput = (name: string, placeholder: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string = 'text') => (
//     <div className="flex flex-col gap-1">
//       <label className="text-black font-medium">{placeholder}</label>
//       <input
//         className={`w-full p-3 border-2 ${errors[name] ? 'border-red-500' : 'border-teal-300'} rounded-lg text-lg focus:outline-none focus:border-teal-500 transition-colors`}
//         name={name}
//         placeholder={`Enter ${placeholder.toLowerCase()}`}
//         value={value}
//         onChange={onChange}
//         type={type}
//         disabled={isLoading}
//         required
//       />
//       {errors[name] && (
//         <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
//       <div className="bg-white p-8 rounded-lg w-[800px] my-8">
//         <h2 className="text-teal-600 mb-6 text-2xl font-semibold">
//           {step === 1 ? 'Register Mother' : "Mother's Next of Kin"}
//         </h2>

//         {errors.api && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//             <p className="text-red-700">{errors.api}</p>
//           </div>
//         )}

//         <form onSubmit={step === 1 ? handleContinue : handleSave} className="space-y-6">
//           {step === 1 ? (
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput('first_name', 'First Name', motherDetails.first_name, handleMotherDetailsChange)}
//               {renderInput('last_name', 'Last Name', motherDetails.last_name, handleMotherDetailsChange)}
//               {renderInput('date_of_birth', 'Date of Birth', motherDetails.date_of_birth, handleMotherDetailsChange, 'date')}
//               {renderInput('tel_no', 'Phone Number', motherDetails.tel_no, handleMotherDetailsChange)}
//               {renderInput('marital_status', 'Marital Status', motherDetails.marital_status, handleMotherDetailsChange)}
//               {renderInput('no_of_children', 'Number of Children', motherDetails.no_of_children, handleMotherDetailsChange, 'number')}
//               {renderInput('village', 'Village', motherDetails.village, handleMotherDetailsChange)}
//               {renderInput('sub_location', 'Sub Location', motherDetails.sub_location, handleMotherDetailsChange)}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput('first_name', 'First Name', nextOfKinDetails.first_name, handleNextOfKinDetailsChange)}
//               {renderInput('last_name', 'Last Name', nextOfKinDetails.last_name, handleNextOfKinDetailsChange)}
//               {renderInput('relationship', 'Relationship', nextOfKinDetails.relationship, handleNextOfKinDetailsChange)}
//               {renderInput('phone_number', 'Phone Number', nextOfKinDetails.phone_number, handleNextOfKinDetailsChange)}
//             </div>
//           )}

//           <div className="flex justify-between items-center">
//             <button
//               type="button"
//               className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
//               onClick={handleCancel}
//               disabled={isLoading}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg flex items-center"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <span className="animate-spin mr-2 border-l-2 border-r-2 border-white rounded-full h-5 w-5"></span>
//               ) : null}
//               {step === 1 ? 'Continue' : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MotherRegistrationForm;


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
        setErrors({ api: '' }); // Clear errors on successful save
    } catch {
        setErrors({ api: 'An error occurred while saving the details.' });
    } finally {
        setIsLoading(false);
    }
};


  const handleCancel = () => {
    onCancel();
  };

  const renderInput = (
    name: keyof MotherDetails, // For mother details
    label: string,
    value: string,
    onChange: (name: keyof MotherDetails, value: string) => void, // Adjust type
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
    name: keyof MotherDetails, // For mother details
    label: string,
    value: string,
    onChange: (name: keyof MotherDetails, value: string) => void // Adjust type
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
    name: keyof NextOfKinDetails, // For next of kin details
    label: string,
    value: string,
    onChange: (name: keyof NextOfKinDetails, value: string) => void // Adjust type
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
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
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
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-500 text-white rounded">{step === 1 ? 'Continue' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotherRegistrationForm;
