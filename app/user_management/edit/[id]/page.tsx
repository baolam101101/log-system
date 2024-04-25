"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const EditUserPage = ({ params} : any) => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect (() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    .then(response => {
      setEmail(response.data.email);
      setName(response.data.name);
      setDob(response.data.dob);
      setPhone(response.data.phone);
      setRole(response.data.role);
      setTitle(response.data.title)
    })
    .catch (error => console.error(`There was an error retrieving the user: ${error}`));
  }, [params.id])

  const updateUser = (e) => {
    e.preventDefault();

    axios.put(`https://jsonplaceholder.typicode.com/posts/${params.id}`,{
      email: email,
      name: name,
      dob: dob,
      phone: phone,
      role: role,
      title: title
    })
    .then(response => {
      console.log(response);
      router.push("/user_management");
    })
    .catch(error => {
      console.error(`There was an error updating the user: ${error}`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Update User</h1>
        <form onSubmit={updateUser}>
          <div className="mb-4">
            <label>
              Email: 
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">
              Name: 
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">
              Date of birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">
              Phone
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">
              Role
            </label>
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
