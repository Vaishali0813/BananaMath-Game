import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../components/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "../../assets/menu1.jpg";
import Navbar from "../../components/Navbar.jsx";


// State variables for managing user input
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        toast.info(`Welcome back, ${currentUser.email}!`, { position: "top-center" });
        navigate("/game-menu"); 
      }
    });
    return () => unsubscribe(); 
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!", { position: "top-center" });
      navigate("/game-menu"); 
    } catch (error) {
      toast.error("Login Failed: " + error.message, { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <Navbar /> 
      <div className="min-h-screen flex justify-center items-start pt-20 px-10"> {/* Adjusted to items-start and added pt-20 */}
        <div className="p-10 rounded-lg shadow-2xl w-full sm:w-96 bg-opacity-0 backdrop-blur-md" style={{ width: '600px', height: '600px' }}>
          <h2 className="text-4xl font-extrabold text-center text-black-400 mb-8 drop-shadow-lg">
            {user ? `Welcome, ${user.email}` : "Login"}
          </h2>

          {!user && ( // Hide the form if user is already logged in
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
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
                  <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
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
                  Login
                </button>
              </div>
            </form>
          )}

          {!user && (
            <div className="mt-6 text-center">
              <p>
                Don't have an account? <a href="/signup" className="text-teal-500 hover:underline">Click here to register</a>.
              </p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
