'use client'

import "../../globals.css";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match!");
      return;
    }

    const registerData = {
      email,
      name,
      address,
      phone,
      password,
      confirmPassword
    };

    try {
    const response = await axios.post("/api/auth/login", registerData);

    if (response.data.success) {
      router.push("/");
    } else {
      alert(response.data.message || "Register failed!");
    }
  }
    catch (error) {
    console.log(error);
    alert("Register failed!!!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2">Phone</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <a href="/" className="flex text-blue-600 float-right">Login</a>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
