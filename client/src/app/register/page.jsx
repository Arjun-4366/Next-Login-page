"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  const data = {
    name: name.trim(),
    email: email.trim(),
    password: password.trim(),
  };

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const handleRegiterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("please fill all fields");
      return;
    }

    try {
      console.log("data", data);
      const response = await axios.post(
        "http://localhost:4000/register",
        data,
        config
      );
      setUserData(response.data);
      console.log("registration successfull", response.data);
      if (response.data.email) {
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <div className="flex flex-col items-center justify-center  w-80 p-8 bg-white  rounded-lg shadow-lg">
        <form className="w-full" onSubmit={handleRegiterSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="mb-2 font-semibold text-gray-700">
              Name
            </label>
            <input
              className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              className=" p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className=" p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 ">
              submit
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Link
              href="/login"
              className="underline text-indigo-600 hover:text-indigo-800">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
