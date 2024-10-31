// // "use client";
// // import React, { useState } from 'react';
// // import { Mother, MotherDetails, NextOfKinDetails } from '../utils/types';

// // import { useAddMother } from '../hooks/useAddMother'; // Hook to handle adding the mother
// // import { addNextOfKin } from '../utils/addNextOfKin'; // Util for adding Next of Kin

// // interface MotherRegistrationFormProps {
// //   onSave: (newMotherData: Mother) => void; // Prop to handle saving the mother
// //   onCancel: () => void;
// //   onMotherAdded: () => void; // A callback to refresh the list after saving the mother
// // }


// // const MotherRegistrationForm: React.FC<MotherRegistrationFormProps> = ({ onCancel, onMotherAdded }) => {
// //   const [step, setStep] = useState(1);
// //   const [motherDetails, setMotherDetails] = useState<MotherDetails>({
// //     id: undefined,  // Initialize `id` as undefined
// //     first_name: '',
// //     last_name: '',
// //     date_of_birth: '',
// //     date_of_reg: '',
// //     tel_no: '',
// //     marital_status: '',
// //     no_of_children: 0,
// //     village: '',
// //     sub_location: '',
// //   });
// //   const [nextOfKinDetails, setNextOfKinDetails] = useState<NextOfKinDetails>({
// //     first_name: '',
// //     last_name: '',
// //     relationship: '',
// //     phone_number: '',
// //     mother_id: 0, // Will be set after saving the mother
// //   });
// //   const [errors, setErrors] = useState<{ [key: string]: string }>({ api: '' });
// //   const [isLoading, setIsLoading] = useState(false);

// //   const { handleAddMother } = useAddMother(); // Use the hook to add the mother

// //   // Handle mother detail input changes
// //   const handleMotherDetailsChange = (name: keyof MotherDetails, value: string) => {
// //     setMotherDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
// //   };

// //   // Handle next of kin detail input changes
// //   const handleNextOfKinDetailsChange = (name: keyof NextOfKinDetails, value: string) => {
// //     setNextOfKinDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
// //   };

// //   const handleContinue = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
  
// //     try {
// //       // Autogenerate registration date
// //       const currentDate = new Date().toISOString().split('T')[0];
// //       const motherDataWithRegDate: MotherDetails = { ...motherDetails, date_of_reg: currentDate };
  
// //       // Call hook to save the mother
// //       const savedMother = await handleAddMother(motherDataWithRegDate); // Now returns Mother | null
  
// //       if (savedMother && savedMother.id !== undefined) {
// //         // Set the mother ID in next of kin details (ensuring it is a valid number)
// //         setNextOfKinDetails((prevDetails) => ({
// //           ...prevDetails,
// //           mother_id: savedMother.id ?? 0, // Ensure this is a number, using `0` as a fallback
// //         }));
  
// //         setStep(2); // Proceed to next step (Next of Kin details)
// //       } else {
// //         setErrors({ api: 'Failed to save mother details. No valid ID returned.' });
// //       }
// //     } catch (error) {
// //       setErrors({ api: 'Failed to save mother details.' });
// //       console.error(error);
      
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  

// //   // Handle Save button for saving the next of kin details
// //   // Handle Save button for saving the next of kin details
// //   const handleSave = async (e: React.FormEvent) => {
// //     e.preventDefault(); // Prevent default form submission behavior
// //     setIsLoading(true); // Disable the button after first click
  
// //     try {
// //       // Call API to save next of kin details
// //       await addNextOfKin(nextOfKinDetails);
  
// //       // Close the form and refresh the list of mothers
// //       onMotherAdded();
// //       setErrors({ api: '' });
// //     } catch (error) {
// //       setErrors({ api: 'Failed to save next of kin details.' });
// //       console.error('Error saving next of kin:', error);
// //     } finally {
// //       setIsLoading(false); // Enable the button again after saving
// //     }
// //   };
  


// //   // Cancel the form
// //   const handleCancel = () => {
// //     onCancel();
// //   };

// //   return (
// //     <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 text-xl flex items-center justify-center z-50">
// //       <div className="modal-container bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
// //         <h2 className="text-xl font-bold mb-4 text-teal-500">Mother Details</h2>
// //         <form onSubmit={step === 1 ? handleContinue : handleSave}>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {step === 1 ? (
// //               <>
// //                 {/* Mother Details Form */}
// //                 <div>
// //                   <label>First Name</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.first_name}
// //                     onChange={(e) => handleMotherDetailsChange('first_name', e.target.value)}
// //                     placeholder="Enter first name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Last Name</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.last_name}
// //                     onChange={(e) => handleMotherDetailsChange('last_name', e.target.value)}
// //                     placeholder="Enter last name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Date of Birth</label>
// //                   <input
// //                     type="date"
// //                     value={motherDetails.date_of_birth}
// //                     onChange={(e) => handleMotherDetailsChange('date_of_birth', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Phone Number</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.tel_no}
// //                     onChange={(e) => handleMotherDetailsChange('tel_no', e.target.value)}
// //                     placeholder="Enter phone number"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Marital Status</label>
// //                   <select
// //                     value={motherDetails.marital_status}
// //                     onChange={(e) => handleMotherDetailsChange('marital_status', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   >
// //                     <option value="">Select</option>
// //                     <option value="married">Married</option>
// //                     <option value="single">Single</option>
// //                     <option value="divorced">Divorced</option>
// //                     <option value="widowed">Widowed</option>
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label>Number of Children</label>
// //                   <input
// //                     type="number"
// //                     value={motherDetails.no_of_children.toString()}
// //                     onChange={(e) => handleMotherDetailsChange('no_of_children', e.target.value)}
// //                     placeholder="Enter number of children"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Village</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.village}
// //                     onChange={(e) => handleMotherDetailsChange('village', e.target.value)}
// //                     placeholder="Enter village"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Sub Location</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.sub_location}
// //                     onChange={(e) => handleMotherDetailsChange('sub_location', e.target.value)}
// //                     placeholder="Enter sub-location"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 {/* Next of Kin Details Form */}
// //                 <div>
// //                   <label>Next of Kin First Name</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.first_name}
// //                     onChange={(e) => handleNextOfKinDetailsChange('first_name', e.target.value)}
// //                     placeholder="Enter next of kin's first name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Next of Kin Last Name</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.last_name}
// //                     onChange={(e) => handleNextOfKinDetailsChange('last_name', e.target.value)}
// //                     placeholder="Enter next of kin's last name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Relationship</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.relationship}
// //                     onChange={(e) => handleNextOfKinDetailsChange('relationship', e.target.value)}
// //                     placeholder="Enter relationship"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Next of Kin Phone Number</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.phone_number}
// //                     onChange={(e) => handleNextOfKinDetailsChange('phone_number', e.target.value)}
// //                     placeholder="Enter phone number"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //           {errors.api && <span className="text-red-500">{errors.api}</span>}
// //           <div className="mt-4 flex justify-between">
// //             <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500 text-xl text-white rounded">Cancel</button>
// //             <button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-500 text-xl text-white rounded">{step === 1 ? 'Continue' : 'Save'}</button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MotherRegistrationForm;




// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import { Mother, MotherDetails, NextOfKinDetails } from '../utils/types';
// // import { useAddMother } from '../hooks/useAddMother'; // Hook to handle adding the mother
// // import { addNextOfKin } from '../utils/addNextOfKin'; // Util for adding Next of Kin

// // // Define locations, sub-locations, and villages
// // const LOCATIONS = [
// //   { location: "Nairobi", sub_location: "Kibera", village: "Soweto East" },
// //   { location: "Nairobi", sub_location: "Mathare", village: "Mathare 4A" },
// //   { location: "Nairobi", sub_location: "Kibera", village: "Laini Saba" },
// //   { location: "Nairobi", sub_location: "Korogocho", village: "Highridge" },
// //   { location: "Nairobi", sub_location: "Kayole", village: "Soweto" },
// //   { location: "Nairobi", sub_location: "Dandora", village: "Phase 4" },
// //   { location: "Nairobi", sub_location: "Mukuru", village: "Mukuru Kwa Reuben" },
// //   { location: "Nairobi", sub_location: "Huruma", village: "Ngei 1" },
// //   { location: "Nairobi", sub_location: "Kawangware", village: "Stage 2" },
// //   { location: "Nairobi", sub_location: "Kamukunji", village: "Majengo" },
// // ];

// // // Define hospitals based on villages
// // const HOSPITALS = {
// //   "Soweto East": ["Soweto East Medical Centre", "Soweto East Health Clinic", "Soweto East Community Dispensary"],
// //   "Mathare 4A": ["Mathare Health Clinic", "Mathare Community Hospital", "Mathare 4A Medical Centre"],
// //   "Laini Saba": ["Laini Saba Hospital", "Kibera South Dispensary", "Laini Saba Community Clinic"],
// //   "Highridge": ["Highridge Medical Centre", "Korogocho Health Clinic", "Highridge Dispensary"],
// //   "Soweto": ["Soweto Health Centre", "Kayole Dispensary", "Soweto Clinic"],
// //   "Phase 4": ["Phase 4 Health Centre", "Dandora Medical Clinic", "Dandora Community Hospital"],
// //   "Mukuru Kwa Reuben": ["Mukuru Kwa Reuben Health Centre", "Kwa Reuben Clinic", "Reuben Dispensary"],
// //   "Ngei 1": ["Ngei 1 Medical Centre", "Huruma Health Dispensary", "Huruma Community Clinic"],
// //   "Stage 2": ["Kawangware Stage 2 Hospital", "Stage 2 Clinic", "Kawangware Dispensary"],
// //   "Majengo": ["Majengo Health Clinic", "Kamukunji Medical Centre", "Majengo Community Dispensary"],
// // };

// // interface MotherRegistrationFormProps {
// //   onSave: (newMotherData: Mother) => void;
// //   onCancel: () => void;
// //   onMotherAdded: () => void;
// // }

// // const MotherRegistrationForm: React.FC<MotherRegistrationFormProps> = ({ onCancel, onMotherAdded }) => {
// //   const [step, setStep] = useState(1);
// //   const [motherDetails, setMotherDetails] = useState<MotherDetails>({
// //     id: undefined,
// //     first_name: '',
// //     last_name: '',
// //     date_of_birth: '',
// //     date_of_reg: '',
// //     tel_no: '',
// //     marital_status: '',
// //     no_of_children: 0,
// //     location: '',
// //     sub_location: '',
// //     village: '',
// //     hospital: '',
// //     chp: '',
// //   });
// //   const [nextOfKinDetails, setNextOfKinDetails] = useState<NextOfKinDetails>({
// //     first_name: '',
// //     last_name: '',
// //     relationship: '',
// //     phone_number: '',
// //     mother_id: 0,
// //   });
// //   const [errors, setErrors] = useState<{ [key: string]: string }>({ api: '' });
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [chpAvailable, setChpAvailable] = useState(true); // State to track CHP availability
// //   const [availableChps, setAvailableChps] = useState<{ id: number; name: string }[]>([]); // State for available CHPs

// //   const { handleAddMother } = useAddMother();

// //   // Handle input changes for mother details
// //   const handleMotherDetailsChange = (name: keyof MotherDetails, value: string) => {
// //     setMotherDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
// //   };

// //   // Filter sub-locations based on the selected location
// //   const filteredSubLocations = [...new Set(
// //     LOCATIONS.filter(loc => loc.location === motherDetails.location)
// //       .map(loc => loc.sub_location)
// //   )];

// //   // Filter villages based on the selected sub-location
// //   const filteredVillages = [...new Set(
// //     LOCATIONS.filter(loc => loc.sub_location === motherDetails.sub_location)
// //       .map(loc => loc.village)
// //   )];

// //   // Filter hospitals based on the selected village
// //   const filteredHospitals = HOSPITALS[motherDetails.village] || [];

// //   // Reset dependent fields when location or sub-location changes
// //   useEffect(() => {
// //     if (!motherDetails.location) {
// //       setMotherDetails(prevDetails => ({
// //         ...prevDetails,
// //         sub_location: '',
// //         village: '',
// //         hospital: '',
// //         chp: '',
// //       }));
// //       setChpAvailable(true); // Reset CHP availability
// //     }
// //   }, [motherDetails.location]);

// //   useEffect(() => {
// //     if (!motherDetails.sub_location) {
// //       setMotherDetails(prevDetails => ({
// //         ...prevDetails,
// //         village: '',
// //         hospital: '',
// //         chp: '',
// //       }));
// //       setChpAvailable(true); // Reset CHP availability
// //     }
// //   }, [motherDetails.sub_location]);

// //   useEffect(() => {
// //     if (!motherDetails.village) {
// //       setMotherDetails(prevDetails => ({
// //         ...prevDetails,
// //         hospital: '',
// //         chp: '',
// //       }));
// //       setChpAvailable(true); // Reset CHP availability
// //     }
// //   }, [motherDetails.village]);

// //   const handleContinue = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     try {
// //       // Autogenerate registration date
// //       const currentDate = new Date().toISOString().split('T')[0];
// //       const motherDataWithRegDate: MotherDetails = { ...motherDetails, date_of_reg: currentDate };

// //       // Validate selections
// //       if (!motherDetails.sub_location || !motherDetails.village) {
// //         setErrors({ api: 'Please select a sub-location and village.' });
// //         setIsLoading(false);
// //         return;
// //       }

// //       // Fetch CHPs based on selected sub-location and village
// //       const fetchedChps = await fetchChp(motherDetails.sub_location, motherDetails.village);
// //       if (!fetchedChps || fetchedChps.length === 0) {
// //         setErrors({ api: 'No available CHP for the selected sub-location or village.' });
// //         setChpAvailable(false); // Update CHP availability status
// //         setIsLoading(false);
// //         return;
// //       }

// //       setAvailableChps(fetchedChps); // Set available CHPs

// //       // Assign the first available CHP for now (can later be modified to allow user selection)
// //       motherDataWithRegDate.chp = fetchedChps[0].name;

// //       // Call hook to save the mother
// //       const savedMother = await handleAddMother(motherDataWithRegDate);

// //       // Log the entire response to debug the issue
// //       console.log('Response from handleAddMother:', savedMother);

// //       if (savedMother && savedMother.id !== undefined) {
// //         setNextOfKinDetails((prevDetails) => ({
// //           ...prevDetails,
// //           mother_id: savedMother.id ?? 0,
// //         }));
// //         setStep(2); // Proceed to next step
// //       } else {
// //         setErrors({ api: 'Failed to save mother details. No valid ID returned.' });
// //         console.error('Error: Invalid response from server, no ID found');
// //       }
// //     } catch (error) {
// //       setErrors({ api: 'Failed to save mother details.' });
// //       console.error('Error in API call:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleSave = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     try {
// //       await addNextOfKin(nextOfKinDetails);
// //       onMotherAdded();
// //       setErrors({ api: '' });
// //     } catch (error) {
// //       setErrors({ api: 'Failed to save next of kin details.' });
// //       console.error('Error saving next of kin:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     onCancel();
// //   };

// //   // Fetch CHP based on sub-location or village from the backend
// //   const fetchChp = async (sub_location: string, village: string): Promise<{ id: number; name: string }[] | null> => {
// //     try {
// //       console.log(`Fetching CHP for Sub-location: ${sub_location}, Village: ${village}`); // Log parameters
// //       const response = await fetch(`/api/getChp?sub_location=${sub_location}&village=${village}`);
// //       if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //       }
// //       const data = await response.json();
// //       console.log('Fetched CHP data:', data); // Log the fetched data
// //       return data.chps || null; // Return the list of CHPs if found, else return null
// //     } catch (error) {
// //       console.error('Error fetching CHP:', error);
// //       return null;
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 text-xl flex items-center justify-center z-50">
// //       <div className="modal-container bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
// //         <h2 className="text-xl font-bold mb-4 text-teal-500">{step === 1 ? 'Mother Details' : 'Next of Kin Details'}</h2>
// //         <form onSubmit={step === 1 ? handleContinue : handleSave}>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {step === 1 ? (
// //               <>
// //                 <div>
// //                   <label>First Name</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.first_name}
// //                     onChange={(e) => handleMotherDetailsChange('first_name', e.target.value)}
// //                     placeholder="Enter first name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Last Name</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.last_name}
// //                     onChange={(e) => handleMotherDetailsChange('last_name', e.target.value)}
// //                     placeholder="Enter last name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Date of Birth</label>
// //                   <input
// //                     type="date"
// //                     value={motherDetails.date_of_birth}
// //                     onChange={(e) => handleMotherDetailsChange('date_of_birth', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Phone Number</label>
// //                   <input
// //                     type="text"
// //                     value={motherDetails.tel_no}
// //                     onChange={(e) => handleMotherDetailsChange('tel_no', e.target.value)}
// //                     placeholder="Enter phone number"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Marital Status</label>
// //                   <select
// //                     value={motherDetails.marital_status}
// //                     onChange={(e) => handleMotherDetailsChange('marital_status', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   >
// //                     <option value="">Select</option>
// //                     <option value="married">Married</option>
// //                     <option value="single">Single</option>
// //                     <option value="divorced">Divorced</option>
// //                     <option value="widowed">Widowed</option>
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label>Number of Children</label>
// //                   <input
// //                     type="number"
// //                     value={motherDetails.no_of_children.toString()}
// //                     onChange={(e) => handleMotherDetailsChange('no_of_children', e.target.value)}
// //                     placeholder="Enter number of children"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Location</label>
// //                   <select
// //                     value={motherDetails.location}
// //                     onChange={(e) => handleMotherDetailsChange('location', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   >
// //                     <option value="">Select Location</option>
// //                     {[...new Set(LOCATIONS.map(loc => loc.location))].map((location, index) => (
// //                       <option key={index} value={location}>{location}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label>Sub-location</label>
// //                   <select
// //                     value={motherDetails.sub_location}
// //                     onChange={(e) => handleMotherDetailsChange('sub_location', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                     disabled={!motherDetails.location}
// //                   >
// //                     <option value="">Select Sub-location</option>
// //                     {filteredSubLocations.map((sub_location, index) => (
// //                       <option key={index} value={sub_location}>{sub_location}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label>Village</label>
// //                   <select
// //                     value={motherDetails.village}
// //                     onChange={(e) => handleMotherDetailsChange('village', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                     disabled={!motherDetails.sub_location}
// //                   >
// //                     <option value="">Select Village</option>
// //                     {filteredVillages.map((village, index) => (
// //                       <option key={index} value={village}>{village}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label>Hospital</label>
// //                   <select
// //                     value={motherDetails.hospital}
// //                     onChange={(e) => handleMotherDetailsChange('hospital', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                     disabled={!motherDetails.village}
// //                   >
// //                     <option value="">Select Hospital</option>
// //                     {filteredHospitals.map((hospital, index) => (
// //                       <option key={index} value={hospital}>{hospital}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label>CHP</label>
// //                   <select
// //                     value={motherDetails.chp}
// //                     onChange={(e) => handleMotherDetailsChange('chp', e.target.value)}
// //                     className="w-full p-3 border-2 rounded-lg"
// //                     disabled={availableChps.length === 0} // Disable if no CHPs are available
// //                   >
// //                     <option value="">Select CHP</option>
// //                     {availableChps.map((chp) => (
// //                       <option key={chp.id} value={chp.name}>{chp.name}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 {!chpAvailable && (
// //                   <div className="text-red-500 mb-2">
// //                     <p>No available CHP for the selected sub-location or village.</p>
// //                     <p>Please select another:</p>
// //                     <button
// //                       type="button"
// //                       onClick={() => {
// //                         // Logic to reset or allow changing location, sub-location, or village
// //                         setMotherDetails(prevDetails => ({
// //                           ...prevDetails,
// //                           sub_location: '',
// //                           village: '',
// //                           hospital: '',
// //                           chp: '',
// //                         }));
// //                         setChpAvailable(true); // Reset availability
// //                       }}
// //                       className="text-teal-500 underline"
// //                     >
// //                       Change Selection
// //                     </button>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <>
// //                 {/* Next of Kin Details Form */}
// //                 <div>
// //                   <label>Next of Kin First Name</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.first_name}
// //                     onChange={(e) => handleNextOfKinDetailsChange('first_name', e.target.value)}
// //                     placeholder="Enter next of kin's first name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Next of Kin Last Name</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.last_name}
// //                     onChange={(e) => handleNextOfKinDetailsChange('last_name', e.target.value)}
// //                     placeholder="Enter next of kin's last name"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Relationship</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.relationship}
// //                     onChange={(e) => handleNextOfKinDetailsChange('relationship', e.target.value)}
// //                     placeholder="Enter relationship"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Next of Kin Phone Number</label>
// //                   <input
// //                     type="text"
// //                     value={nextOfKinDetails.phone_number}
// //                     onChange={(e) => handleNextOfKinDetailsChange('phone_number', e.target.value)}
// //                     placeholder="Enter next of kin's phone number"
// //                     className="w-full p-3 border-2 rounded-lg"
// //                   />
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //           {errors.api && <span className="text-red-500">{errors.api}</span>}
// //           <div className="mt-4 flex justify-between">
// //             <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500 text-xl text-white rounded">
// //               Cancel
// //             </button>
// //             <button type="submit" disabled={isLoading || !chpAvailable} className="px-4 py-2 bg-teal-500 text-xl text-white rounded">
// //               {step === 1 ? 'Continue' : 'Save'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MotherRegistrationForm;


// "use client";
// import React, { useState, useEffect } from 'react';
// import { Mother, MotherDetails, NextOfKinDetails } from '../utils/types';
// import { useAddMother } from '../hooks/useAddMother'; // Hook to handle adding the mother
// import { addNextOfKin } from '../utils/addNextOfKin'; // Util for adding Next of Kin

// // Define locations, sub-locations, and villages
// const LOCATIONS = [
//   { location: "Nairobi", sub_location: "Kibera", village: "Soweto East" },
//   { location: "Nairobi", sub_location: "Mathare", village: "Mathare 4A" },
//   { location: "Nairobi", sub_location: "Kibera", village: "Laini Saba" },
//   { location: "Nairobi", sub_location: "Korogocho", village: "Highridge" },
//   { location: "Nairobi", sub_location: "Kayole", village: "Soweto" },
//   { location: "Nairobi", sub_location: "Dandora", village: "Phase 4" },
//   { location: "Nairobi", sub_location: "Mukuru", village: "Mukuru Kwa Reuben" },
//   { location: "Nairobi", sub_location: "Huruma", village: "Ngei 1" },
//   { location: "Nairobi", sub_location: "Kawangware", village: "Stage 2" },
//   { location: "Nairobi", sub_location: "Kamukunji", village: "Majengo" },
// ];

// // Define hospitals based on villages
// const HOSPITALS = {
//   "Soweto East": ["Soweto East Medical Centre", "Soweto East Health Clinic", "Soweto East Community Dispensary"],
//   "Mathare 4A": ["Mathare Health Clinic", "Mathare Community Hospital", "Mathare 4A Medical Centre"],
//   "Laini Saba": ["Laini Saba Hospital", "Kibera South Dispensary", "Laini Saba Community Clinic"],
//   "Highridge": ["Highridge Medical Centre", "Korogocho Health Clinic", "Highridge Dispensary"],
//   "Soweto": ["Soweto Health Centre", "Kayole Dispensary", "Soweto Clinic"],
//   "Phase 4": ["Phase 4 Health Centre", "Dandora Medical Clinic", "Dandora Community Hospital"],
//   "Mukuru Kwa Reuben": ["Mukuru Kwa Reuben Health Centre", "Kwa Reuben Clinic", "Reuben Dispensary"],
//   "Ngei 1": ["Ngei 1 Medical Centre", "Huruma Health Dispensary", "Huruma Community Clinic"],
//   "Stage 2": ["Kawangware Stage 2 Hospital", "Stage 2 Clinic", "Kawangware Dispensary"],
//   "Majengo": ["Majengo Health Clinic", "Kamukunji Medical Centre", "Majengo Community Dispensary"],
// };

// interface MotherRegistrationFormProps {
//   onSave: (newMotherData: Mother) => void;
//   onCancel: () => void;
//   onMotherAdded: () => void;
// }

// const MotherRegistrationForm: React.FC<MotherRegistrationFormProps> = ({ onCancel, onMotherAdded }) => {
//   const [step, setStep] = useState(1);
//   const [motherDetails, setMotherDetails] = useState<MotherDetails>({
//     id: undefined,
//     first_name: '',
//     last_name: '',
//     date_of_birth: '',
//     date_of_reg: '',
//     tel_no: '',
//     marital_status: '',
//     no_of_children: 0,
//     location: '',
//     sub_location: '',
//     village: '',
//     hospital: '',
//     chp: '',
//   });
//   const [nextOfKinDetails, setNextOfKinDetails] = useState<NextOfKinDetails>({
//     first_name: '',
//     last_name: '',
//     relationship: '',
//     phone_number: '',
//     mother_id: 0,
//   });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({ api: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [availableChps, setAvailableChps] = useState<{ id: number; name: string }[]>([]); // State for available CHPs

//   const { handleAddMother } = useAddMother();

//   // Handle input changes for mother details
//   const handleMotherDetailsChange = (name: keyof MotherDetails, value: string) => {
//     setMotherDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   // Handle input changes for next of kin details
//   const handleNextOfKinDetailsChange = (name: keyof NextOfKinDetails, value: string) => {
//     setNextOfKinDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   // Filter sub-locations based on the selected location
//   const filteredSubLocations = [...new Set(
//     LOCATIONS.filter(loc => loc.location === motherDetails.location)
//       .map(loc => loc.sub_location)
//   )];

//   // Filter villages based on the selected sub-location
//   const filteredVillages = [...new Set(
//     LOCATIONS.filter(loc => loc.sub_location === motherDetails.sub_location)
//       .map(loc => loc.village)
//   )];

//   // Filter hospitals based on the selected village
//   const filteredHospitals = HOSPITALS[motherDetails.village] || [];

//   // Fetch CHPs when the village changes
//   useEffect(() => {
//     if (motherDetails.village) {
//       fetchChps(motherDetails.village);
//     }
//   }, [motherDetails.village]);

//   // Fetch CHP based on village from the backend
//   const fetchChps = async (village: string) => {
//     try {
//       const response = await fetch(`/api/getChps?village=${village}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch CHPs');
//       }

//       const data = await response.json();
//       setAvailableChps(data.chps || []); // Set available CHPs
//     } catch (error) {
//       console.error('Error fetching CHPs:', error);
//       setErrors({ api: 'Failed to fetch CHPs' });
//     }
//   };

//   const handleContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Validate selections
//       if (!motherDetails.sub_location || !motherDetails.village || !motherDetails.chp) {
//         setErrors({ api: 'Please select all required fields including CHP.' });
//         setIsLoading(false);
//         return;
//       }

//       // Autogenerate registration date
//       const currentDate = new Date().toISOString().split('T')[0];
//       const motherDataWithRegDate: MotherDetails = { ...motherDetails, date_of_reg: currentDate };

//       // Call hook to save the mother
//       const savedMother = await handleAddMother(motherDataWithRegDate);

//       if (savedMother && savedMother.id !== undefined) {
//         setNextOfKinDetails((prevDetails) => ({
//           ...prevDetails,
//           mother_id: savedMother.id ?? 0,
//         }));
//         setStep(2); // Proceed to next step
//       } else {
//         setErrors({ api: 'Failed to save mother details. No valid ID returned.' });
//         console.error('Error: Invalid response from server, no ID found');
//       }
//     } catch (error) {
//       setErrors({ api: 'Failed to save mother details.' });
//       console.error('Error in API call:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       await addNextOfKin(nextOfKinDetails);
//       onMotherAdded();
//       setErrors({ api: '' });
//     } catch (error) {
//       setErrors({ api: 'Failed to save next of kin details.' });
//       console.error('Error saving next of kin:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     onCancel();
//   };

//   return (
//     <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 text-xl flex items-center justify-center z-50">
//       <div className="modal-container bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
//         <h2 className="text-xl font-bold mb-4 text-teal-500">{step === 1 ? 'Mother Details' : 'Next of Kin Details'}</h2>
//         <form onSubmit={step === 1 ? handleContinue : handleSave}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {step === 1 ? (
//               <>
//                 {/* Mother Details Form */}
//                 <div>
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     value={motherDetails.first_name}
//                     onChange={(e) => handleMotherDetailsChange('first_name', e.target.value)}
//                     placeholder="Enter first name"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     value={motherDetails.last_name}
//                     onChange={(e) => handleMotherDetailsChange('last_name', e.target.value)}
//                     placeholder="Enter last name"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Date of Birth</label>
//                   <input
//                     type="date"
//                     value={motherDetails.date_of_birth}
//                     onChange={(e) => handleMotherDetailsChange('date_of_birth', e.target.value)}
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Phone Number</label>
//                   <input
//                     type="text"
//                     value={motherDetails.tel_no}
//                     onChange={(e) => handleMotherDetailsChange('tel_no', e.target.value)}
//                     placeholder="Enter phone number"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Marital Status</label>
//                   <select
//                     value={motherDetails.marital_status}
//                     onChange={(e) => handleMotherDetailsChange('marital_status', e.target.value)}
//                     className="w-full p-3 border-2 rounded-lg"
//                   >
//                     <option value="">Select</option>
//                     <option value="married">Married</option>
//                     <option value="single">Single</option>
//                     <option value="divorced">Divorced</option>
//                     <option value="widowed">Widowed</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label>Number of Children</label>
//                   <input
//                     type="number"
//                     value={motherDetails.no_of_children.toString()}
//                     onChange={(e) => handleMotherDetailsChange('no_of_children', e.target.value)}
//                     placeholder="Enter number of children"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Location</label>
//                   <select
//                     value={motherDetails.location}
//                     onChange={(e) => handleMotherDetailsChange('location', e.target.value)}
//                     className="w-full p-3 border-2 rounded-lg"
//                   >
//                     <option value="">Select Location</option>
//                     {[...new Set(LOCATIONS.map(loc => loc.location))].map((location, index) => (
//                       <option key={index} value={location}>{location}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label>Sub-location</label>
//                   <select
//                     value={motherDetails.sub_location}
//                     onChange={(e) => handleMotherDetailsChange('sub_location', e.target.value)}
//                     className="w-full p-3 border-2 rounded-lg"
//                     disabled={!motherDetails.location}
//                   >
//                     <option value="">Select Sub-location</option>
//                     {filteredSubLocations.map((sub_location, index) => (
//                       <option key={index} value={sub_location}>{sub_location}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label>Village</label>
//                   <select
//                     value={motherDetails.village}
//                     onChange={(e) => handleMotherDetailsChange('village', e.target.value)}
//                     className="w-full p-3 border-2 rounded-lg"
//                     disabled={!motherDetails.sub_location}
//                   >
//                     <option value="">Select Village</option>
//                     {filteredVillages.map((village, index) => (
//                       <option key={index} value={village}>{village}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label>Hospital</label>
//                   <select
//                     value={motherDetails.hospital}
//                     onChange={(e) => handleMotherDetailsChange('hospital', e.target.value)}
//                     className="w-full p-3 border-2 rounded-lg"
//                     disabled={!motherDetails.village}
//                   >
//                     <option value="">Select Hospital</option>
//                     {filteredHospitals.map((hospital, index) => (
//                       <option key={index} value={hospital}>{hospital}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label>CHP</label>
//                   <select
//                     value={motherDetails.chp}
//                     onChange={(e) => handleMotherDetailsChange('chp', e.target.value)}
//                     className="w-full p-3 border-2 rounded-lg"
//                     disabled={!availableChps.length}
//                   >
//                     <option value="">Select CHP</option>
//                     {availableChps.map((chp) => (
//                       <option key={chp.id} value={chp.name}>{chp.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {!availableChps.length && motherDetails.village && (
//                   <div className="text-red-500 mb-2">
//                     No available CHPs for the selected village.
//                   </div>
//                 )}
//               </>
//             ) : (
//               <>
//                 {/* Next of Kin Details Form */}
//                 <div>
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     value={nextOfKinDetails.first_name}
//                     onChange={(e) => handleNextOfKinDetailsChange('first_name', e.target.value)}
//                     placeholder="Enter next of kin's first name"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     value={nextOfKinDetails.last_name}
//                     onChange={(e) => handleNextOfKinDetailsChange('last_name', e.target.value)}
//                     placeholder="Enter next of kin's last name"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Relationship</label>
//                   <input
//                     type="text"
//                     value={nextOfKinDetails.relationship}
//                     onChange={(e) => handleNextOfKinDetailsChange('relationship', e.target.value)}
//                     placeholder="Enter relationship"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label>Phone Number</label>
//                   <input
//                     type="text"
//                     value={nextOfKinDetails.phone_number}
//                     onChange={(e) => handleNextOfKinDetailsChange('phone_number', e.target.value)}
//                     placeholder="Enter next of kin's phone number"
//                     className="w-full p-3 border-2 rounded-lg"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           {errors.api && <span className="text-red-500">{errors.api}</span>}
//           <div className="mt-4 flex justify-between">
//             <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500 text-xl text-white rounded">
//               Cancel
//             </button>
//             <button type="submit" disabled={isLoading || !availableChps.length} className="px-4 py-2 bg-teal-500 text-xl text-white rounded">
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
import React, { useState, useEffect } from 'react';
import { Mother, MotherDetails, NextOfKinDetails } from '../utils/types';
import { useAddMother } from '../hooks/useAddMother'; // Hook to handle adding the mother
import { addNextOfKin } from '../utils/addNextOfKin'; // Util for adding Next of Kin

// Define locations, sub-locations, and villages
const LOCATIONS = [
  { location: "Nairobi", sub_location: "Kibera", village: "Soweto East" },
  { location: "Nairobi", sub_location: "Mathare", village: "Mathare 4A" },
  { location: "Nairobi", sub_location: "Kibera", village: "Laini Saba" },
  { location: "Nairobi", sub_location: "Korogocho", village: "Highridge" },
  { location: "Nairobi", sub_location: "Kayole", village: "Soweto" },
  { location: "Nairobi", sub_location: "Dandora", village: "Phase 4" },
  { location: "Nairobi", sub_location: "Mukuru", village: "Mukuru Kwa Reuben" },
  { location: "Nairobi", sub_location: "Huruma", village: "Ngei 1" },
  { location: "Nairobi", sub_location: "Kawangware", village: "Stage 2" },
  { location: "Nairobi", sub_location: "Kamukunji", village: "Majengo" },
];

// Define hospitals based on villages
const HOSPITALS = {
  "Soweto East": ["Soweto East Medical Centre", "Soweto East Health Clinic"],
  "Mathare 4A": ["Mathare Health Clinic", "Mathare 4A Medical Centre"],
  "Laini Saba": ["Laini Saba Hospital", "Laini Saba Community Clinic"],
  "Highridge": ["Highridge Medical Centre", "Highridge Dispensary"],
  "Soweto": ["Soweto Health Centre", "Kayole Dispensary"],
  "Phase 4": ["Phase 4 Health Centre", "Dandora Medical Clinic"],
  "Mukuru Kwa Reuben": ["Mukuru Kwa Reuben Health Centre"],
  "Ngei 1": ["Ngei 1 Medical Centre", "Huruma Dispensary"],
  "Stage 2": ["Kawangware Stage 2 Hospital"],
  "Majengo": ["Majengo Health Clinic"],
};

interface MotherRegistrationFormProps {
  onSave: (newMotherData: Mother) => void;
  onCancel: () => void;
  onMotherAdded: () => void;
}

const MotherRegistrationForm: React.FC<MotherRegistrationFormProps> = ({ onCancel, onMotherAdded }) => {
  const [step, setStep] = useState(1);
  const [motherDetails, setMotherDetails] = useState<MotherDetails>({
    id: undefined,
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_reg: '',
    tel_no: '',
    marital_status: '',
    no_of_children: 0,
    location: '',
    sub_location: '',
    village: '',
    hospital: '',
    chp: '',
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
  const [availableChps, setAvailableChps] = useState<{ id: number; name: string }[]>([]); // State for available CHPs

  const { handleAddMother } = useAddMother();

  // Handle input changes for mother details
  const handleMotherDetailsChange = (name: keyof MotherDetails, value: string) => {
    setMotherDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle input changes for next of kin details
  const handleNextOfKinDetailsChange = (name: keyof NextOfKinDetails, value: string) => {
    setNextOfKinDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Filter sub-locations based on the selected location
  const filteredSubLocations = [...new Set(
    LOCATIONS.filter(loc => loc.location === motherDetails.location)
      .map(loc => loc.sub_location)
  )];

  // Filter villages based on the selected sub-location
  const filteredVillages = [...new Set(
    LOCATIONS.filter(loc => loc.sub_location === motherDetails.sub_location)
      .map(loc => loc.village)
  )];

  // Filter hospitals based on the selected village
  const filteredHospitals = HOSPITALS[motherDetails.village] || [];

  // Fetch CHPs when the village and sub-location change
  useEffect(() => {
    if (motherDetails.village && motherDetails.sub_location) {
      fetchChps(motherDetails.sub_location, motherDetails.village);
    }
  }, [motherDetails.village, motherDetails.sub_location]);

  // Fetch CHP based on sub-location and village from the backend
  const fetchChps = async (sub_location: string, village: string) => {
    try {
      const response = await fetch(`https://mamamind-db02af72f48f.herokuapp.com/api/chps?sub_location=${sub_location}&village=${village}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CHPs');
      }

      const data = await response.json();
      setAvailableChps(data.chps || []); // Set available CHPs
    } catch (error) {
      console.error('Error fetching CHPs:', error);
      setErrors({ api: 'Failed to fetch CHPs' });
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate selections
      if (!motherDetails.sub_location || !motherDetails.village || !motherDetails.chp) {
        setErrors({ api: 'Please select all required fields including CHP.' });
        setIsLoading(false);
        return;
      }

      // Autogenerate registration date
      const currentDate = new Date().toISOString().split('T')[0];
      const motherDataWithRegDate: MotherDetails = { ...motherDetails, date_of_reg: currentDate };

      // Call hook to save the mother
      const savedMother = await handleAddMother(motherDataWithRegDate);

      if (savedMother && savedMother.id !== undefined) {
        setNextOfKinDetails((prevDetails) => ({
          ...prevDetails,
          mother_id: savedMother.id ?? 0,
        }));
        setStep(2); // Proceed to next step
      } else {
        setErrors({ api: 'Failed to save mother details. No valid ID returned.' });
        console.error('Error: Invalid response from server, no ID found');
      }
    } catch (error) {
      setErrors({ api: 'Failed to save mother details.' });
      console.error('Error in API call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addNextOfKin(nextOfKinDetails);
      onMotherAdded();
      setErrors({ api: '' });
    } catch (error) {
      setErrors({ api: 'Failed to save next of kin details.' });
      console.error('Error saving next of kin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 text-xl flex items-center justify-center z-50">
      <div className="modal-container bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-teal-500">{step === 1 ? 'Mother Details' : 'Next of Kin Details'}</h2>
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
                  <label>Location</label>
                  <select
                    value={motherDetails.location}
                    onChange={(e) => handleMotherDetailsChange('location', e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                  >
                    <option value="">Select Location</option>
                    {[...new Set(LOCATIONS.map(loc => loc.location))].map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Sub-location</label>
                  <select
                    value={motherDetails.sub_location}
                    onChange={(e) => handleMotherDetailsChange('sub_location', e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                    disabled={!motherDetails.location}
                  >
                    <option value="">Select Sub-location</option>
                    {filteredSubLocations.map((sub_location, index) => (
                      <option key={index} value={sub_location}>{sub_location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Village</label>
                  <select
                    value={motherDetails.village}
                    onChange={(e) => handleMotherDetailsChange('village', e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                    disabled={!motherDetails.sub_location}
                  >
                    <option value="">Select Village</option>
                    {filteredVillages.map((village, index) => (
                      <option key={index} value={village}>{village}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Hospital</label>
                  <select
                    value={motherDetails.hospital}
                    onChange={(e) => handleMotherDetailsChange('hospital', e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                    disabled={!motherDetails.village}
                  >
                    <option value="">Select Hospital</option>
                    {filteredHospitals.map((hospital, index) => (
                      <option key={index} value={hospital}>{hospital}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>CHP</label>
                  <select
                    value={motherDetails.chp}
                    onChange={(e) => handleMotherDetailsChange('chp', e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                    disabled={!availableChps.length}
                  >
                    <option value="">Select CHP</option>
                    {availableChps.map((chp) => (
                      <option key={chp.id} value={chp.name}>{chp.name}</option>
                    ))}
                  </select>
                </div>
                {!availableChps.length && motherDetails.village && (
                  <div className="text-red-500 mb-2">
                    No available CHPs for the selected village.
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Next of Kin Details Form */}
                <div>
                  <label>First Name</label>
                  <input
                    type="text"
                    value={nextOfKinDetails.first_name}
                    onChange={(e) => handleNextOfKinDetailsChange('first_name', e.target.value)}
                    placeholder="Enter next of kin's first name"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
                <div>
                  <label>Last Name</label>
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
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={nextOfKinDetails.phone_number}
                    onChange={(e) => handleNextOfKinDetailsChange('phone_number', e.target.value)}
                    placeholder="Enter next of kin's phone number"
                    className="w-full p-3 border-2 rounded-lg"
                  />
                </div>
              </>
            )}
          </div>
          {errors.api && <span className="text-red-500">{errors.api}</span>}
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500 text-xl text-white rounded">
              Cancel
            </button>
            <button type="submit" disabled={isLoading || !availableChps.length} className="px-4 py-2 bg-teal-500 text-xl text-white rounded">
              {step === 1 ? 'Continue' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotherRegistrationForm;
