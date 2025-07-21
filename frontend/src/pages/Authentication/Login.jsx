import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Navbar.jsx";
import handImage from "../../assets/hand.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      toast.info(`Welcome back, ${storedUser.userName || storedUser.email}!`, {
        position: "top-center",
      });
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions", {
        position: "bottom-center",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ FIX: Save only the user object
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Logged in successfully!", { position: "top-center" });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(err.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <div className="bg-gray-100 p-10 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            {!user && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="text-sm text-blue-500 hover:underline text-right">
                  <a href="#">Forgot Password</a>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I accept the <a href="#" className="text-teal-500 hover:underline">terms and conditions</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-lg font-semibold transition duration-300"
                  disabled={!termsAccepted}
                >
                  Login
                </button>

                <div className="text-sm text-center mt-4">
                  Create an account? <a href="/signup" className="text-blue-500 hover:underline">Click here</a>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src={handImage}
            alt="Helping hands"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
