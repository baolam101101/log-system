"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function FileDetails( {params}: any ) {
  const [fileDetails, setFileDetails] = useState(null);
  
  useEffect(() => {
    const getFileById = async () => {
      try {
        const {data} = await axios.get(
          `https://2af8-115-78-231-117.ngrok-free.app/detail/${params.id}`
        );
        setFileDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (params.id) {
      getFileById();
    }
    
  }, [params.id]);

  return (
    <div className="container">
      {fileDetails ? (
        <div className="container m-auto p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">File Details</h1>
          <div className="flex flex-col mb-4">
            <p className="font-bold">Name: {fileDetails.name}</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="font-bold">Type: {fileDetails.type}</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="font-bold">
              Date Created: {new Date(fileDetails.dateCreated).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="font-bold">
            Storage Size: {fileDetails.storageSize}
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="font-bold">Created By: {fileDetails.createdBy}</p>
          </div>
          <Link href={"/files/"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to List
            </button>
          </Link>
          <Link href={`/files/edit/${params.id}`}>
            <button className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FileDetails;