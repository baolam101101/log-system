"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [files, setFiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "File 1",
        title: "Đây là file 1",
        datetime: new Date("2024-04-04T10:58:00+07:00"),
        storageSize: 123456,
      },
      {
        id: 2,
        name: "File 2",
        title: "Đây là file 2",
        datetime: new Date("2024-06-03T11:00:00+07:00"),
        storageSize: 654321,
      },
      {
        id: 3,
        name: "File 3",
        title: "Đây là file 3",
        datetime: new Date("2024-02-08:23:15+07:00"),
        storageSize: 986124,
      },
      {
        id: 4,
        name: "File 4",
        title: "Đây là file 4",
        datetime: new Date("2024-06-03T06:11:42+07:00"),
        storageSize: 876742,
      },
      {
        id: 5,
        name: "File 5",
        title: "Đây là file 5",
        datetime: new Date("2024-04-24T05:29:00+07:00"),
        storageSize: 907124,
      },
      {
        id: 6,
        name: "File 6",
        title: "Đây là file 6",
        datetime: new Date("2024-09-13T02:30:03+07:00"),
        storageSize: 248976,
      },
      {
        id: 7,
        name: "File 7",
        title: "Đây là file 7",
        datetime: new Date("2024-11-30T10:10:40+07:00"),
        storageSize: 498712,
      },
      {
        id: 8,
        name: "File 8",
        title: "Đây là file 8",
        datetime: new Date("2024-09-11T01:24:12+07:00"),
        storageSize: 541242,
      },
      {
        id: 9,
        name: "File 9",
        title: "Đây là file 9",
        datetime: new Date("2024-09-20T09:17:47+07:00"),
        storageSize: 498712,
      },
      {
        id: 10,
        name: "File 10",
        title: "Đây là file 10",
        datetime: new Date("2024-06-20T04:37:58+07:00"),
        storageSize: 541242,
      },
    ];

    setFiles(data);
  }, []);

  const filteredFiles = React.useMemo(() => {
    let filteredData = files;

    if (searchText) {
      filteredData = filteredData.filter(
        (file) =>
          file.name.toLowerCase().includes(searchText.toLowerCase()) ||
          file.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDate) {
      filteredData = filteredData.filter(
        (file) =>
          new Date(file.datetime.toISOString()).getUTCDate() ===
          new Date(selectedDate).getUTCDate()
      );
    }

    return filteredData;
  }, [files, searchText, selectedDate]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDelete = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  // Call API from server

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/api/files/${id}`);
  //     setFiles(files.filter((file) => file.id !== id));
  //   } catch (error) {
  //     alert("Error deleting file!");
  //   }
  // };

  const handleDownload = async (file) => {
    try {
      const response = await axios.get(`/api/files/${file.id}/download`);
      // Option 1: Download file directly (if response contains file data)
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.click();
      window.URL.revokeObjectURL(url);

      // Option 2: Download from a provided URL (if response contains download URL)
      const downloadUrl = response.data.url;
      window.location.href = downloadUrl;
    } catch (error) {
      alert("Error downloading file");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Files List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name or title"
          className="border p-2 mr-2"
          value={searchText}
          onChange={handleSearchChange}
        />
        <input
          type="date"
          onChange={(event) => handleDateChange(event.target.value)}
        />
      </div>
      <a href="files/create" className="border p-2 bg-black text-white">
        Upload file
      </a>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Date Time</th>
            <th>Storage Size</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file.name} className="border-b hover:bg-gray-100">
              <td className="p-2">{file.name}</td>
              <td className="p-2">{file.title}</td>
              <td className="p-2">{file.datetime.toLocaleString()}</td>
              <td className="p-2">{file.storageSize} bytes</td>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() => handleDownload(file)}
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
              </button>
              <td>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

export default View;
