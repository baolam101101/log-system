
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const FileEdit = ( {params} : any ) => {
  const [fileData, setFileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
        setFileData(response.data);
      } catch (err) {
        console.log(err);
        setError(err.message || "An error occurred!");
      } finally {
        setIsLoading(false);
      }
    } ;
if (params.id) {
  fetchData();
}

}, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (!fileData) {
    return <p>No file found with ID: {params.id}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">File Edit</h1>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Name:</p>
        <p>{fileData.id}</p>
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Type:</p>
        <p>{fileData.type}</p>
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Date Time:</p>
        <p>{fileData.datetime}</p>
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Storage Size:</p>
        <p>{fileData.storageSize} bytes</p>
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Created By:</p>
        <p>{fileData.createdBy}</p>
      </div>
      <Link href="/files">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to List
        </button>
      </Link>
    </div>
  );
};

export default FileEdit;