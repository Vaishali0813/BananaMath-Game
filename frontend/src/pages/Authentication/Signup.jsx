import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx"; 
import bgImage from "../../assets/menu1.jpg"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../components/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs"; 

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

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        userName: username,
        password: hashedPassword,
      });

      console.log("User Registered Successfully:", user);
      toast.success("User Registered Successfully!!", { position: "top-center" });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
      console.error("Registration Error:", error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <Navbar />
      <div className="min-h-screen flex justify-center items-start pt-12 px-10">
        <div className="p-10 rounded-lg shadow-2xl w-full sm:w-96 bg-opacity-0 backdrop-blur-md" style={{ width: '600px', height: 'auto' }}>
          <h2 className="text-4xl font-extrabold text-center text-black-400 mb-8 drop-shadow-lg">
            Register
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="h-5 w-5"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I accept the <a href="#" className="text-teal-500 hover:underline">terms and conditions</a>.
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-40 text-black py-3 rounded-lg text-xl font-semibold hover:opacity-90 transition duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#b5a669' }}
                disabled={!termsAccepted}
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p>
              Already have an account? <a href="/login" className="text-black-5600 hover:underline">Click here to login</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
