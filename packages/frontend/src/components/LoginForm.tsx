import React, { useRef } from "react"; // Removed useEffect
import { pb } from "../auth/pocketbase";
import { trackUmamiEvent } from "../utils/umami";
// Removed import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Removed useEffect for reading cookie

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // authWithPassword automatically updates pb.authStore (which uses localStorage by default)
      await pb
        .collection("users")
        .authWithPassword(
          emailRef.current?.value || "",
          passwordRef.current?.value || ""
        );
      console.log("Login successful");
      trackUmamiEvent("login-success");
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
                name="email"
                autoComplete="email"
                className="input input-bordered w-full"
                ref={emailRef}
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
                name="password"
                autoComplete="current-password"
                className="input input-bordered w-full"
                ref={passwordRef}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
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
