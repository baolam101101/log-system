"use client";
import axios from "axios";
import { useState } from "react";

const ChangePasswordPage = ({ params }: any) => {
  const [password, setPassword] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();

    if (password === "" || newPassword === "") {
      alert("You need to fill your password!!!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    if (password === newPassword){
      alert("The password must not be the same as the new password!!")
      return;
    }

    await axios
      .put(`https://jsonplaceholder.typicode.com/users/${params.id}`, {
        password: newPassword,
      })
      .then((res) => {
        console.log(res);
        alert("Change password success!");
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
        <form onSubmit={changePassword}>
          <div className="flex flex-col mb-4">
            <label className="mb-2" htmlFor="password">
              Old Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2" htmlFor="newPassword">
              New Password:
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 flex-grow"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
