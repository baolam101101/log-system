// 'use client'

// import "../../globals.css";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from "axios";

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 

//     const loginData = {
//       email,
//       password
//     };
    
//     try {
//       const response = await axios.post("/api/auth/login", loginData);

//       if (response.data.success) {
//         router.push("/files");
//       } else {
//         alert(response.data.message || 'Login failed!');
//       }
//     } catch (error) {
//       console.log(error);
//       alert('Login failed!!!');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Login</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-2">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-md py-2 px-4"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-md py-2 px-4"
//             />
//           </div>
//           <a href="/accounts/register" className="flex text-blue-600 float-right">Register</a>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
