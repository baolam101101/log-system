// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// const View = () => {
//   const [files, setFiles] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     const data = [
//       {
//         id: 1,
//         name: "File 1",
//         type: "Đây là file 1",
//         datetime: new Date("2024-04-04T10:58:00+07:00"),
//         storageSize: 123456,
//       },
//       {
//         id: 2,
//         name: "File 2",
//         type: "Đây là file 2",
//         datetime: new Date("2024-06-03T11:00:00+07:00"),
//         storageSize: 654321,
//       },
//       {
//         id: 3,
//         name: "File 3",
//         type: "Đây là file 3",
//         datetime: new Date("2024-02-08:23:15+07:00"),
//         storageSize: 986124,
//       },
//       {
//         id: 4,
//         name: "File 4",
//         type: "Đây là file 4",
//         datetime: new Date("2024-06-03T06:11:42+07:00"),
//         storageSize: 876742,
//       },
//       {
//         id: 5,
//         name: "File 5",
//         type: "Đây là file 5",
//         datetime: new Date("2024-04-24T05:29:00+07:00"),
//         storageSize: 907124,
//       },
//       {
//         id: 6,
//         name: "File 6",
//         type: "Đây là file 6",
//         datetime: new Date("2024-09-13T02:30:03+07:00"),
//         storageSize: 248976,
//       },
//       {
//         id: 7,
//         name: "File 7",
//         type: "Đây là file 7",
//         datetime: new Date("2024-11-30T10:10:40+07:00"),
//         storageSize: 498712,
//       },
//       {
//         id: 8,
//         name: "File 8",
//         type: "Đây là file 8",
//         datetime: new Date("2024-09-11T01:24:12+07:00"),
//         storageSize: 541242,
//       },
//       {
//         id: 9,
//         name: "File 9",
//         type: "Đây là file 9",
//         datetime: new Date("2024-09-20T09:17:47+07:00"),
//         storageSize: 498712,
//       },
//       {
//         id: 10,
//         name: "File 10",
//         type: "Đây là file 10",
//         datetime: new Date("2024-06-20T04:37:58+07:00"),
//         storageSize: 541242,
//       },
//     ];

//     setFiles(data);
//   }, []);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get("/api/files");
//   //       setFiles(response.data);
//   //     } catch (err) {
//   //       console.error("Error fetching files:", err);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [searchText, selectedDate]);

//   const filteredFiles = React.useMemo(() => {
//     let filteredData = files;

//     if (searchText) {
//       filteredData = filteredData.filter(
//         (file) =>
//           file.name.toLowerCase().includes(searchText.toLowerCase()) ||
//           file.type.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }

//     if (selectedDate) {
//       filteredData = filteredData.filter((file) =>
//         new Date(file.datetime.toISOString()).getUTCDate()
//       );
//     }

//     return filteredData;
//   }, [files, searchText, selectedDate]);

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/files/${id}`);
//       setFiles(files.filter((file) => file.id !== id));
//     } catch (error) {
//       alert("Error deleting file!");
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <Link href="/">
//         <button className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded float-right">
//           Log out
//         </button>
//       </Link>
//       <h1 className="text-2xl font-bold mb-4 text-center">Files List</h1>
//       <div className="flex mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or type"
//           className="border p-2 mr-2"
//           value={searchText}
//           onChange={handleSearchChange}
//         />
//         <input
//           type="date"
//           onChange={(event) => handleDateChange(event.target.value)}
//         />
//       </div>
//       <a
//         href="files/create"
//         className="border p-2 bg-blue-500 text-white float-right"
//       >
//         Upload file
//       </a>
//       <table className="table-auto w-full">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Date Time</th>
//             <th>Storage Size</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredFiles.map((file) => (
//             <tr key={file.name} className="border-b hover:bg-gray-100">
//               <td className="p-2">{file.name}</td>
//               <td className="p-2">{file.type}</td>
//               <td className="p-2">{file.datetime}</td>
//               <td className="p-2">{file.storageSize} bytes</td>
//               <td className="p-2">{file.createdBy}</td>
//               <td className="p-2">
//                 {file.id && (
//                   <Link href={`/files/detail/${file.id}`}>
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       Detail
//                     </button>
//                   </Link>
//                 )}
//               </td>
//               <td>
//                 <button
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                   onClick={() => handleDelete(file.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {filteredFiles.length === 0 && (
//         <p className="text-center text-gray-500 mt-4">
//           No files found matching your search criteria.
//         </p>
//       )}
//     </div>
//   );
// };

// export default View;


"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const View = () => {
  const [files, setFiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "File 1",
        description: "Đây là file 1",
        datetime: new Date("2024-04-04T10:58:00+07:00"),
        storageSize: 123456,
      },
      {
        id: 2,
        name: "File 2",
        description: "Đây là file 2",
        datetime: new Date("2024-06-03T11:00:00+07:00"),
        storageSize: 654321,
      },
      {
        id: 3,
        name: "File 3",
        description: "Đây là file 3",
        datetime: new Date("2024-02-08:23:15+07:00"),
        storageSize: 986124,
      },
      {
        id: 4,
        name: "File 4",
        description: "Đây là file 4",
        datetime: new Date("2024-06-03T06:11:42+07:00"),
        storageSize: 876742,
      },
      {
        id: 5,
        name: "File 5",
        description: "Đây là file 5",
        datetime: new Date("2024-04-24T05:29:00+07:00"),
        storageSize: 907124,
      },
      {
        id: 6,
        name: "File 6",
        description: "Đây là file 6",
        datetime: new Date("2024-09-13T02:30:03+07:00"),
        storageSize: 248976,
      },
      {
        id: 7,
        name: "File 7",
        description: "Đây là file 7",
        datetime: new Date("2024-11-30T10:10:40+07:00"),
        storageSize: 498712,
      },
      {
        id: 8,
        name: "File 8",
        description: "Đây là file 8",
        datetime: new Date("2024-09-11T01:24:12+07:00"),
        storageSize: 541242,
      },
      {
        id: 9,
        name: "File 9",
        description: "Đây là file 9",
        datetime: new Date("2024-09-20T09:17:47+07:00"),
        storageSize: 498712,
      },
      {
        id: 10,
        name: "File 10",
        description: "Đây là file 10",
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
          file.description.toLowerCase().includes(searchText.toLowerCase())
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

  return (
    <div className="container mx-auto">
      <Link href="/accounts/login">
        <button className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded float-right">
          Log out
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Files List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name or des"
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
            <th>Description</th>
            <th>Date Time</th>
            <th>Storage Size</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file.name} className="border-b hover:bg-gray-100">
              <td className="p-2">{file.name}</td>
              <td className="p-2">{file.description}</td>
              <td className="p-2">{file.datetime.toLocaleString()}</td>
              <td className="p-2">{file.storageSize} bytes</td>
              <td className="p-2">
                {file.id && (
                  <Link href={`/files/${file.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                       Detail
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

export default View;