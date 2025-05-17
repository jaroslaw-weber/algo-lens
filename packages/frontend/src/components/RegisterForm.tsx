import React, { useState, useEffect } from "react";
import { pb } from "../auth/pocketbase";
import Cookies from 'js-cookie';
import { trackUmamiEvent } from "../utils/umami";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      pb.authStore.save(token);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection("users").create({
        email,
        password,
        passwordConfirm,
      });
      // Store token in cookie and redirect
      console.log("Registration successful");
      trackUmamiEvent('register-success');
      // Optionally log in the user after registration
      await pb.collection("users").authWithPassword(email, password);
      Cookies.set('token', pb.authStore.token);
      window.location.href = "/";
    } catch (error: any) {
      // Show error message
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Register</h1>
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
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="input input-bordered w-full"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="link link-primary">
              Login here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;