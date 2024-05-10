"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [refresh, setRefresh] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://2af8-115-78-231-117.ngrok-free.app/file`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const data = res.data;
        console.log(res);
        setFiles(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };
    fetchData();
  }, [searchText, selectedDate, refresh]);

  const filteredFiles = React.useMemo(() => {
    let filteredData = files;

    if (searchText) {
      filteredData = filteredData.filter(
        (file) =>
          file.email.toLowerCase().includes(searchText.toLowerCase()) ||
          file.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDate) {
      filteredData = filteredData.filter(
        (file) =>
          new Date(file.datetime.toISOString()).getUTCDate() ===
          new Date(selectedDate).getUTCDate()
      );
    }

    return files.length > 0 ? filteredData : [];
  }, [files, searchText, selectedDate]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this file?")) {
      try {
        await axios.delete(`https://2af8-115-78-231-117.ngrok-free.app/file/${id}`);
        setFiles(files.filter((file) => file.id !== id));
        setRefresh(!refresh);
      } catch (error) {
        alert("Error deleting file!");
      }
    }
  };
  

  return (
    <div className="container mx-auto p-8">
      {/* <Link href="/accounts/login">
        <button className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded float-right">
          Log out
        </button>
      </Link> */}
      <h1 className="text-2xl font-bold mb-4 text-center">Files List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name or type"
          className="border p-2 mr-2"
          value={searchText}
          onChange={handleSearchChange}
        />
        <input
          type="date"
          onChange={(event) => handleDateChange(event.target.value)}
        />
      </div>
      <a
        href="files/create"
        className="border p-2 bg-black text-white float-right bg-blue-600"
      >
        Upload file
      </a>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Date Time</th>
            <th>Storage Size</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file.name} className="border-b hover:bg-gray-100">
              <td className="p-2">{file.name}</td>
              <td className="p-2">{file.type}</td>
              <td className="p-2">{file.datetime.toLocaleString()}</td>
              <td className="p-2">{file.storageSize} bytes</td>
              <td className="p-2">{file.createdBy} </td>
              <td className="p-2">
                {file.id && (
                  <Link href={`/files/detail/${file.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Detail
                    </button>
                  </Link>
                )}
              </td>
              <td className="p-2">
                {file.id && (
                  <Link href={`/files/edit/${file.id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                  </Link>
                )}
              </td>
              <td>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(file.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredFiles.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No files found matching your search criteria.
        </p>
      )}
    </div>
  );
};

export default Files;
