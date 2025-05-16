import React, { useState } from "react"; // Removed useEffect
import { pb } from "../auth/pocketbase";
// Removed import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Removed useEffect for reading cookie

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // authWithPassword automatically updates pb.authStore (which uses localStorage by default)
      await pb.collection("users").authWithPassword(email, password);
      console.log("Login successful");
      // Removed Cookies.set('token', pb.authStore.token);
      window.location.href = "/"; // Redirect after successful login
    } catch (error: any) {
      // Show error message
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="link link-primary">
              Register here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
