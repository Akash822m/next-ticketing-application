// app/signup/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { username, password });
      // Redirect to login page on successful signup
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Signup</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          placeholder="Password"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
