import React, { useState, useEffect } from "react";
import { pb } from "../auth/pocketbase";
import Cookies from "js-cookie";
import { trackUmamiEvent } from "../utils/umami";

/* Temporarily commented out Google OAuth functionality
const handleGoogleLogin = async () => {
  try {
    const authData = await pb.collection("users").authWithOAuth2({
      provider: "google",
      redirectUrl: window.location.origin,
    });
    console.log("Google login successful", authData);
    trackUmamiEvent("google-login-success");
    window.location.href = "/";
  } catch (error: any) {
    console.error("Google login failed:", error);
    alert("Google login failed: " + error.message);
  }
};
*/

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
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
      trackUmamiEvent("register-success");
      // Optionally log in the user after registration
      await pb.collection("users").authWithPassword(email, password);
      Cookies.set("token", pb.authStore.token);
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
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
            {/* Temporarily hidden Google OAuth button */}
            {/* <div className="divider">OR</div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button> */}
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
