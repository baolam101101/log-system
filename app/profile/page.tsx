"use client";
import React, { useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  return (
    <div className="flex container mx-auto p-8">
      <div className="w-64 bg-gray-200 min-h-screen p-4 space-y-4">
        <a
          href="/profile"
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Profile
        </a>
        <button
          onClick={handleForgotPassword}
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change your password
        </button>
        <button
          onClick={handleForgotPassword}
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Your file
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
