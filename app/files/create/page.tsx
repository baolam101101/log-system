"use client";

import "../../globals.css";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CreateFileForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File | null>(null);
  const [DateTime, setDateTime] = useState<Date | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFiles(e.target.files[0]);
      setDateTime(new Date());
    }
  };

  const handleUpload = async () => {
    if (files) {
      setStatus("uploading");
      const formData = new FormData();
      formData.append("files", files);
      console.log(files)
      try {
        const response = await axios.post("/api/files/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
        setStatus("success");
        router.push("/files");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <div
      className="flex-col space-y-4 p-4 bg-white rounded-lg shadow-md"
    >
      <Link href="/files">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to List
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Upload file</h1>

      <div className="form-group">
        <input
          type="file"
          id="uploadFile"
          name="uploadFile"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {files && (
        <section>
          File details:
          <ul>
            <li>Name: {files.name}</li>
            <li>Type: {files.type}</li>
            <li>Storage Size: {files.size} bytes</li>
            <li>Date Created: {DateTime.toLocaleString()}</li>
            <li>Created By: </li>
          </ul>
        </section>
      )}
      {files && (
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
      <Result status={status} />
    </div>
  );
}

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ Upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading started...</p>;
  } else {
    return null;
  }
};

export default CreateFileForm;
