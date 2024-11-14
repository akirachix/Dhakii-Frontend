// 'use client';
// import React, { useState } from 'react';
// import { FormData } from '@/app/utils/chp';


// interface AddCHPModalProps {
//  isOpen: boolean;
//  onClose: () => void;
//  onAddCHP: (chpData: FormData) => void;
// }


// export const AddCHPModal: React.FC<AddCHPModalProps> = ({ isOpen, onClose, onAddCHP }) => {
//  const [formData, setFormData] = useState<FormData>({
//    first_name: '',
//    last_name: '',
//    username: '',
//    phone_number: '',
//    email: '',
//    reg_no: '',
//    location: '',
//    sub_location: '',
//    village: '',
//    registered_date: '',
//    user: ''
//  });


//  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    setFormData({ ...formData, [e.target.name]: e.target.value });
//  };


//  const requiredFields: (keyof FormData)[] = [
//    'first_name',
//    'last_name',
//    'username',
//    'phone_number',
//    'email',
//    'reg_no',
//    'location',
//    'sub_location',
//    'village',
//    'registered_date',
//    'user'
//  ];


//  const handleSubmit = (e: React.FormEvent) => {
//    e.preventDefault();


//    for (const field of requiredFields) {
//      if (!formData[field]) {
//        alert(`Please fill in the required field: ${field.replace('_', ' ')}`);
//        return;
//      }
//    }


//    onAddCHP(formData);
//    onClose();
//  };


//  if (!isOpen) return null;


//  return (
//    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
//      <div className="bg-white p-8 rounded-md shadow-xl w-[900px]">
//        <h2 className="text-2xl font-bold mb-6 text-left text-[#02A6A6]">Register CHP</h2>
//        <form onSubmit={handleSubmit}>
//          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                First Name <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="first_name"
//                value={formData.first_name}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Last Name <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="last_name"
//                value={formData.last_name}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Username <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="username"
//                value={formData.username}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Phone Number <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="phone_number"
//                value={formData.phone_number}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Email <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="email"
//                name="email"
//                value={formData.email}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Reg No <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="reg_no"
//                value={formData.reg_no}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Location <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="location"
//                value={formData.location}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Sub-Location <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="sub_location"
//                value={formData.sub_location}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Village <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="village"
//                value={formData.village}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                Registered Date <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="date"
//                name="registered_date"
//                value={formData.registered_date}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//            <div className="mb-4">
//              <label className="block text-gray-700 text-sm font-bold mb-2">
//                User ID of this CHP <span className="text-red-500">*</span>
//              </label>
//              <input
//                type="text"
//                name="user"
//                value={formData.user}
//                onChange={handleChange}
//                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
//                required
//              />
//            </div>
//          </div>
//          <div className="flex items-center justify-center mt-6 space-x-4">
//            <button
//              type="button"
//              onClick={onClose}
//              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//            >
//              Cancel
//            </button>
//            <button
//              type="submit"
//              className="bg-[#F18721] hover:bg-[#E16701] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//            >
//              Register
//            </button>
//          </div>
//        </form>
//      </div>
//    </div>
//  );
// };






'use client';


import React, { useState, useEffect } from 'react';


interface FormData {
 first_name: string;
 last_name: string;
 password: string;
 username: string;
 phone_number: string;
 email: string;
 reg_no: string;
 location: string;
 sub_location: string;
 village: string;
 hospital: string;
 user: string;
}


interface AddCHPModalProps {
 isOpen: boolean;
 onClose: () => void;
 onAddCHP: (chpData: FormData) => void;
}


const NAIROBI_LOCATIONS = [
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


export const AddCHPModal: React.FC<AddCHPModalProps> = ({ isOpen, onClose, onAddCHP }) => {
 const [formData, setFormData] = useState<FormData>({
   first_name: '',
   last_name: '',
   password: '',
   username: '',
   phone_number: '',
   email: '',
   reg_no: '',
   location: '',
   sub_location: '',
   village: '',
   hospital: '',
   user: '',
 });


 const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
 const [filteredHospitals, setFilteredHospitals] = useState<any[]>([]);


 useEffect(() => {
   const fetchHospitals = async () => {
     try {
       const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/hospitals/');
       const hospitalsData = await response.json();


       // Filter hospitals based on sub-location within Nairobi
       const filtered = hospitalsData.filter((hospital: any) =>
         NAIROBI_LOCATIONS.some((loc) => loc.sub_location === hospital.sub_location)
       );
       setFilteredHospitals(filtered);
     } catch (error) {
       console.error('Error fetching hospitals:', error);
     }
   };


   fetchHospitals();
 }, []);


 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();


   const {
     first_name, last_name, email, password, username, phone_number,
     reg_no, location, sub_location, village, hospital
   } = formData;


   if (!first_name || !last_name || !email || !password || !username ||
       !phone_number || !reg_no || !location || !sub_location || !village || !hospital) {
     alert('Please fill in all the required fields.');
     return;
   }


   try {
     // Create the user
     const userResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/users/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username: formData.username,
         first_name: formData.first_name,
         last_name: formData.last_name,
         email: formData.email,
         phone_number: formData.phone_number,
         user_role: 'chp',
         hospital: formData.hospital,
         password: formData.password,
       }),
     });


     if (!userResponse.ok) {
       const userError = await userResponse.json();
       alert(`User creation failed: ${userError.detail || 'Unknown error'}`);
       return;
     }


     const createdUser = await userResponse.json();


     // Create the CHP using the created user's ID
     const chpResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/chps/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username: formData.username,
         first_name: formData.first_name,
         last_name: formData.last_name,
         email: formData.email,
         phone_number: formData.phone_number,
         reg_no: formData.reg_no,
         location: formData.location,
         sub_location: formData.sub_location,
         village: formData.village,
         user: createdUser.id,
         hospital: formData.hospital,
       }),
     });


     if (!chpResponse.ok) {
       const chpError = await chpResponse.json();
       alert(`CHP creation failed: ${chpError.detail || 'Unknown error'}`);
       return;
     }


     alert('CHP created successfully!');
     onAddCHP(formData);
     onClose();
   } catch (error) {
     console.error('Error creating CHP:', error);
     alert('Failed to create CHP.');
   }
 };


 if (!isOpen) return null;


 return (
   <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
     <div className="bg-white p-8 rounded-md shadow-xl w-[900px]">
       <h2 className="text-2xl font-bold mb-6 text-left text-[#02A6A6]">Register CHP</h2>
       <form onSubmit={handleSubmit}>
         <div className="grid grid-cols-2 gap-x-16 gap-y-8">


           {/* First Name */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               First Name <span className="text-red-500">*</span>
             </label>
             <input
               type="text"
               name="first_name"
               value={formData.first_name}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             />
           </div>


           {/* Last Name */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Last Name <span className="text-red-500">*</span>
             </label>
             <input
               type="text"
               name="last_name"
               value={formData.last_name}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             />
           </div>


           {/* Email */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Email <span className="text-red-500">*</span>
             </label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             />
           </div>


           {/* Password */}
           <div className="mb-4 relative">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Password <span className="text-red-500">*</span>
             </label>
             <input
               type={passwordVisible ? 'text' : 'password'}
               name="password"
               value={formData.password}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2 pr-10"
               required
             />
             <span
               className="absolute top-9 right-3 cursor-pointer"
               onClick={() => setPasswordVisible(!passwordVisible)}
             >
               {passwordVisible ? (
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   strokeWidth={1.5}
                   stroke="currentColor"
                   className="w-6 h-6 text-gray-500"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3.98 8.214C5.137 6.677 7.56 4.5 12 4.5s6.863 2.177 8.02 3.714c.619.77.98 1.477.98 2.036 0 .56-.361 1.266-.98 2.036C18.863 13.823 16.44 16 12 16s-6.863-2.177-8.02-3.714c-.619-.77-.98-1.477-.98-2.036 0-.56.361-1.266.98-2.036z"
                   />
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                   />
                 </svg>
               ) : (
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   strokeWidth={1.5}
                   stroke="currentColor"
                   className="w-6 h-6 text-gray-500"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M10.94 10.94a3 3 0 104.12 4.12"
                   />
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M2.4 7.032c1.6 2.157 4.282 4.218 8.6 4.218 4.32 0 7-2.061 8.6-4.218M2.4 16.968c1.6-2.157 4.282-4.218 8.6-4.218 4.32 0 7 2.061 8.6 4.218"
                   />
                 </svg>
               )}
             </span>
           </div>


           {/* Username */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Username <span className="text-red-500">*</span>
             </label>
             <input
               type="text"
               name="username"
               value={formData.username}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             />
           </div>


           {/* Telephone Number */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Telephone Number <span className="text-red-500">*</span>
             </label>
             <input
               type="text"
               name="phone_number"
               value={formData.phone_number}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             />
           </div>


           {/* Reg No */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Reg No <span className="text-red-500">*</span>
             </label>
             <input
               type="text"
               name="reg_no"
               value={formData.reg_no}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             />
           </div>


           {/* Location */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Location <span className="text-red-500">*</span>
             </label>
             <select
               name="location"
               value={formData.location}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             >
               <option value="">Select location</option>
               {NAIROBI_LOCATIONS.map((loc, index) => (
                 <option key={index} value={loc.location}>{loc.location}</option>
               ))}
             </select>
           </div>


           {/* Sub-Location */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Sub-Location <span className="text-red-500">*</span>
             </label>
             <select
               name="sub_location"
               value={formData.sub_location}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             >
               <option value="">Select sub-location</option>
               {NAIROBI_LOCATIONS.map((loc, index) => (
                 <option key={index} value={loc.sub_location}>{loc.sub_location}</option>
               ))}
             </select>
           </div>


           {/* Village */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Village <span className="text-red-500">*</span>
             </label>
             <select
               name="village"
               value={formData.village}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             >
               <option value="">Select village</option>
               {NAIROBI_LOCATIONS.map((loc, index) => (
                 <option key={index} value={loc.village}>{loc.village}</option>
               ))}
             </select>
           </div>


           {/* Hospital */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Hospital <span className="text-red-500">*</span>
             </label>
             <select
               name="hospital"
               value={formData.hospital}
               onChange={handleChange}
               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-[#02A6A6] focus:ring-[#02A6A6] focus:ring-2"
               required
             >
               <option value="">Select hospital</option>
               {filteredHospitals.map((hospital, index) => (
                 <option key={index} value={hospital.id}>{hospital.name}</option>
               ))}
             </select>
           </div>
         </div>


         {/* Submit and Cancel Buttons */}
         <div className="flex items-center justify-center mt-6 space-x-4">
           <button
             type="button"
             onClick={onClose}
             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
             Cancel
           </button>
           <button
             type="submit"
             className="bg-[#F18721] hover:bg-[#E16701] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
             Register
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};




