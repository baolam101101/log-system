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
          `https://d55d-2402-800-63a6-b82f-115e-4169-a78c-c61a.ngrok-free.app/file/detail/${params.id}`, 
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
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
              Date Created: {new Date(fileDetails.datetime).toLocaleString()}
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