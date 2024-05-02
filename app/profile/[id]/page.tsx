"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = ({ params }: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then((res) => {
        setEmail(res.data.email);
        setName(res.data.name);
        setDob(res.data.dob);
        setAddress(res.data.address);
        setPhone(res.data.phone);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the use: ${error}`)
      );
  }, [params.id]);

  const editUser = (e) => {
    e.preventDefault();

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${params.id}`, {
        email: email,
        name: name,
        dob: dob,
        address: address,
        phone: phone,
      })
      .then((res) => {
        console.log(res);
        alert("Edit user success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex container mx-auto p-8">
      <div className="w-64 bg-gray-200 min-h-screen p-4 space-y-4">
        <a
          href={`/profile/${params.id}`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Profile
        </a>
        <a
          href={`/profile/${params.id}/change_password`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change your password
        </a>
        <a
          href={`/profile/${params.id}/files_uploaded`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Your file
        </a>
      </div>

      <div className="flex-1 flex flex-col items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-5">Profile</h1>
        <form onSubmit={editUser}>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Dob:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 flex-grow"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
