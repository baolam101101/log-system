// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/router";

// const FileDetail = () => {
//   const router = useRouter();
//   const { fileId } = router.query;

//   const [fileData, setFileData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(`/api/files/${fileId}`);
//         setFileData(response.data);
//       } catch (err) {
//         console.log(err);
//         setError(err.message || "An error occurred!");
//       } finally {
//         setIsLoading(false);
//       }
//     } ;

//     fetchData();
// }, [fileId]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>
//   }

//   if (!fileData) {
//     return <p>No file found with ID: {fileId}</p>;
//   }

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">File Details</h1>
//       <div className="flex flex-col mb-4">
//         <p className="font-bold">Name:</p>
//         <p>{fileData.name}</p>
//       </div>
//       <div className="flex flex-col mb-4">
//         <p className="font-bold">Type:</p>
//         <p>{fileData.type}</p>
//       </div>
//       <div className="flex flex-col mb-4">
//         <p className="font-bold">Date Time:</p>
//         <p>{fileData.datetime}</p>
//       </div>
//       <div className="flex flex-col mb-4">
//         <p className="font-bold">Storage Size:</p>
//         <p>{fileData.storageSize} bytes</p>
//       </div>
//       <div className="flex flex-col mb-4">
//         <p className="font-bold">Created By:</p>
//         <p>{fileData.createdBy}</p>
//       </div>
//       <Link href="/files">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Back to List
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default FileDetail;

// // export default function FileDetails({ params }: { params: { fileId: string } }) {
// //   return <h1>Detail about product {params.fileId}</h1>;
// // }

'use client'
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FileDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [fileDetails, setFileDetails] = useState(null);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await axios.get(`/api/files/${id}`);
        setFileDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchFileDetails();
    }
  }, [id])

  return (
    <div>
      {fileDetails ? (
        <div>
          <h1>{fileDetails.name}</h1>
          <p>Type: {fileDetails.type}</p>
          <p>Size: {fileDetails.size} bytes</p>
          <p>Date Created: {new Date(fileDetails.createdAt).toLocaleString()}</p>
          <p>Created By: {fileDetails.createdBy}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default FileDetails;
