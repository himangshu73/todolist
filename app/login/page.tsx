"use client";

export default function Login(): JSX.Element {
  return (
    <div className="flex flex-col flex-1 p-4 rounded-lg shadow-lg max-w-md mx-auto mt-8 bg-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center">Login Form</h1>
      <form className="flex flex-col space-y-4">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
