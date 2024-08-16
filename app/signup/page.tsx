"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup(): JSX.Element {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Password do not match");
      return;
    }

    const createuser = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/signup", {
          name: user.name,
          email: user.email,
          password: user.password,
        });

        console.log("User created:", response.data);
        alert("User Created Successfully");
        router.push("/");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setErrorMessage("User already exists");
          alert("User Already Exists")
        } else {
          setErrorMessage("Error creating user");
        }
      } finally {
        setLoading(false);
      }
    };
    createuser();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrorMessage(null);
  };
  return (
    <div className="flex flex-col flex-1 p-4 rounded-lg shadow-lg max-w-md mx-auto mt-8 bg-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center">Signup Form</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          value={user.name}
          required
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          value={user.email}
          required
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
          name="password"
          value={user.password}
          required
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={user.confirmPassword}
          required
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
