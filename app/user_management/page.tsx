"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const UserManagement = () => {
  const [files, setFiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        setFiles(data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };
    fetchData();
  }, [searchText, selectedDate]);

  const filteredFiles = React.useMemo(() => {
    let filteredData = files;

    if (searchText) {
      filteredData = filteredData.filter((file) =>
        file.email.toLowerCase().includes(searchText.toLowerCase()) ||
        file.phone.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDate) {
      filteredData = filteredData.filter(
        (file) =>
          file.dob && new Date(file.dob.toISOString()).getUTCDate() ===
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
    if (window.confirm("Do you want to delete this user?")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setFiles(files.filter((file) => file.id !== id));
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
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by email or phone"
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
        href="user_management/create"
        className="border p-2 bg-black text-white float-right bg-blue-600"
      >
        Create User
      </a>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file.name} className="border-b hover:bg-gray-100">
              <td className="p-2">{file.name}</td>
              <td className="p-2">{file.email}</td>
              <td className="p-2">YYYY-MM-DD</td>
              <td className="p-2">{file.address.street}, {file.address.city} City</td>
              <td className="p-2">{file.phone}</td>
              <td className="p-2">Role</td>
              <td className="p-2">
                {file.id && (
                  <Link href={`/user_management/edit/${file.id}`}>
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

export default UserManagement;
