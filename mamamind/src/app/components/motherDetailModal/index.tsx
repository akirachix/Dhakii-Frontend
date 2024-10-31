

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { fetchMotherById } from '@/app/utils/fetchMotherbyId';
// import { Mother } from '@/app/utils/types';
// import Layout from '@/app/Layout';

// const MotherDetailsPage = ({ params: { id } }: { params: { id: number } }) => {
//   const [mother, setMother] = useState<Mother | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   useEffect(() => {
//     const getMother = async () => {
//       if (!id) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const fetchedMother = await fetchMotherById(id);
//         setMother(fetchedMother);
//         handleOpenModal(); 
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getMother();
//   }, [id]);

//   if (loading) return <p className="text-center text-lg text-gray-600 mt-10">Loading...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
//   if (!mother) return <p className="text-center text-lg text-gray-600 mt-10">Mother not found.</p>;

//   return (
//     <Layout>
//       <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-10 flex justify-center items-start">
//         <h1 className="text-4xl font-bold text-[#662113] text-center mb-4">
//           Mother Details
//         </h1>
//         <button 
//           onClick={handleOpenModal} 
//           className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
//         >
//           Show Mother Details
//         </button>

//         {isModalOpen && mother && (
//           <div className="modal">
//             <div className="modal-content bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
//               <h2 className="text-4xl font-bold text-[#662113] text-center">
//                 Mother: {mother.first_name} {mother.last_name}
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
//                 <div className="bg-gray-50 p-4 rounded-lg shadow-md">
//                   <label className="block text-black font-semibold mb-1">Village</label>
//                   <p className="text-gray-700">{mother.village}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg shadow-md">
//                   <label className="block text-black font-semibold mb-1">Marital Status</label>
//                   <p className="text-gray-700">{mother.marital_status}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg shadow-md">
//                   <label className="block text-black font-semibold mb-1">Number of Children</label>
//                   <p className="text-gray-700">{mother.no_of_children}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg shadow-md">
//                   <label className="block text-black font-semibold mb-1">Phone Number</label>
//                   <p className="text-gray-700">{mother.tel_no}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg shadow-md">
//                   <label className="block text-black font-semibold mb-1">Date of Registration</label>
//                   <p className="text-gray-700">{mother.date_of_reg}</p>
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-center">
//                 <button 
//                   onClick={handleCloseModal} 
//                   className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default MotherDetailsPage;
