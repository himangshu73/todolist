"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/authContext";

interface User {
  email: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userlogin = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/login", {
          email: user.email,
          password: user.password,
        });
        console.log("Login Successful");
        const { userName } = response.data;
        login(userName)
        alert("Login Successful");
        router.push("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data.message || "Login Failed";
          alert(errorMessage);
        } else {
          console.error("Error:", error);
          alert("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    userlogin();
  };

  return (
    <div className="flex flex-col flex-1 p-4 rounded-lg shadow-lg max-w-md mx-auto mt-8 bg-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center">Login Form</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="email"
          id="email"
          value={user.email}
          name="email"
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={user.password}
          name="password"
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
          disabled={loading}
        >
          {loading ? "Logging...." : "Login"}
        </button>
      </form>
    </div>
  );
}
