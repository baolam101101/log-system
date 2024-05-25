"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const FileUploadedPage = ({ params }: any) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const FileUploaded = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${params.id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setFiles(res.data);
      } catch (err) { 
        console.log(err);
      }
    };
    FileUploaded();
  }, [params.id]);

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
          </tr> 
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.name} className="border-b hover:bg-gray-100">
              <td className="p-2">{file.title}</td>
              
            </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileUploadedPage;
