"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FileEdit = ({ params }: any) => {
  const router = useRouter();
  const [fileData, setFileData] = useState(null);
  const [files, setFiles] = useState<File | null>(null);
  const [DateTime, setDateTime] = useState<Date | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://d55d-2402-800-63a6-b82f-115e-4169-a78c-c61a.ngrok-free.app/file/edit/${params.id}`
        );
        setFileData(response.data);
      } catch (err) {
        console.log(err);
        setError(err.message || "An error occurred!");
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) {
      fetchData();
    }
  }, [params.id]);

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
        const response = await axios.put(`https://d55d-2402-800-63a6-b82f-115e-4169-a78c-c61a.ngrok-free.app/file/edit/${params.id}`, formData, {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!fileData) {
    return <p>No file found with ID: {params.id}</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">File Edit</h1>

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
      <Link href="/files">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to List
        </button>
      </Link>
    </div>
  );
};

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

export default FileEdit;
