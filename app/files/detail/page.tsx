import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Detail = ({ fileData }) => {
//   if (!fileData) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">File Details</h1>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Name:</p>
        {/* <p>{fileData.name}</p> */}
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Description:</p>
        {/* <p>{fileData.description}</p> */}
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Date Time:</p>
        {/* <p>{fileData.datetime.toLocaleString()}</p> */}
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Storage Size:</p>
        {/* <p>{fileData.storageSize} bytes</p> */}
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-bold">Created By:</p>
        {/* <p>{fileData.createdBy}</p> */}
      </div>
      <Link href="/files">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to List
        </button>
      </Link>
    </div>
  );
};

export default Detail;
