// import Image from "next/image";
"use client"
import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import Login from "./login/page";
export default function Home() {
 

  return (
    <div className="flex  flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700  text-white">
      <h1 className="text-4xl font-bold mb-6 font-mono">Welcome To Dashboard</h1>
      <div className="flex justify-center mt-3">
        <Link href="login" className="p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200">
      Login   
        </Link>
          </div>
    </div>
  );
}
