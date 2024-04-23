"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function FileDetails( {params}: any ) {
  const [fileDetails, setFileDetails] = useState(null);
  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const {data} = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${params.id}`
        );
        // const res = await axios.get(`/api/files/${id}`);
        setFileDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (params.id) {
      fetchFileDetails();
    }
    
  }, [params.id]);

  return (
    <div>
      {fileDetails ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">File Details</h1>
          <div className="flex flex-col mb-4">
            <p className="font-bold">Name: {fileDetails.id}</p>
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
            <p className="font-bold">Created By: {fileDetails.createdBy}</p>
          </div>
          <Link href={"/files/"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to List
            </button>
          </Link>
          <Link href={"/files/"}>
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