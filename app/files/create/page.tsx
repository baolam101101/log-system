"use client";

import "../../globals.css";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = yup.object({
  name: yup.string().required("Please fill your name"),
  title: yup.string().required("Please fill your title"),
  uploadFile: yup
    .mixed<File>()
    .required()
    .test(
      "fileSelected",
      "A file is required",
      (value) => value && value.size > 0
    ),
});

function CreateFileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    dateTime: "",
    storageSize: "",
    uploadFile: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      title: "",
      dateTime: "",
      storageSize: "",
      uploadFile: null,
    });
    reset();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("dateTime", data.dateTime);
    formData.append("storageSize", data.storageSize);
    formData.append("uploadFile", data.uploadFile);

    axios
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        alert("File uploaded successfully!");
        router.push('/files');
      })
      .catch(function (error) {
        alert("There was an error uploading the file.");
      });
  };

  return (  
    <form
      className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/files">Lists File</a>
          </li>
          {/* <li className="breadcrumb-item active">Create File</li> */}
        </ol>
      <h1 className="text-2xl font-bold mb-4 text-center">Upload file</h1>

      <div className="form-group">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          {...register("name")}
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          {...register("title")}
          value={formData.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div className="form-group">
        <label
          htmlFor="uploadFile"
          className="block text-gray-700 font-bold mb-2"
        >
          File
        </label>
        <input
          type="file"
          id="uploadFile"
          name="uploadFile"
          {...register("uploadFile")}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.uploadFile && (
          <span className="text-red-500 text-sm">
            {errors.uploadFile?.message}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleClear}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Clear
      </button>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create
      </button>
    </form>
  );
}

export default CreateFileForm;
