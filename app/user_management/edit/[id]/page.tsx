"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const EditUserPage = ({ params }: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const EditData = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${params.id}`
        );
        setEmail(res.data.email);
        setName(res.data.name);
        setDob(res.data.dob);
        setPhone(res.data.phone);
        setRole(res.data.role);
      } catch (error) {
        console.error(`There was an error retrieving the user: ${error}`);
      }
    };
    EditData();
  }, [params.id]);

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${params.id}`,
        {
          email: email,
          name: name,
          dob: dob,
          phone: phone,
          role: role,
        }
      );
      console.log(res);
      router.push("/user_management");
    } catch (error) {
      console.error(`There was an error updating the user: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Update User</h1>
        <form onSubmit={updateUser}>
          <div className="mb-4">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Date of birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Role</label>
            <select
              id="role"
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            >
              <option value={"admin"}>Admin</option>
              <option value={"staff"}>Staff</option>
            </select>
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

export default EditUserPage;
