import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import handImage from "../../assets/hand.webp";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userName: username, // ✅ Backend expects this as `userName`
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast.success("User Registered Successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        {/* Left: Registration Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <div className="bg-gray-100 p-10 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
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

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Confirm your password"
                  required
                />
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
                Register
              </button>

              <div className="text-sm text-center mt-4">
                Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src={handImage}
            alt="Helping hands"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
