import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Update user state after login
        // Fetch the username from Firestore
        const userDoc = await getDoc(doc(db, "Users", currentUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().userName);
        }
      } else {
        setUser(null);
        setUsername(""); // Clear username if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav
      className="w-full py-3 px-6 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-10"
      style={{ backgroundColor: '#d1c699' }} // Custom background color for Navbar
    >
      <div className="flex space-x-4">
        <Link
          to="/"
          className="px-4 py-2 text-black font-bold rounded-lg shadow"
          style={{ backgroundColor: '#b5a669' }} // Custom background color for buttons
        >
          Home
        </Link>
        <Link
          to="/int"
          className="px-4 py-2 text-black font-bold rounded-lg shadow"
          style={{ backgroundColor: '#b5a669' }} // Custom background color for buttons
        >
          Instructions
        </Link>
        <Link
          to="/game-menu"
          className="px-4 py-2 text-black font-bold rounded-lg shadow"
          style={{ backgroundColor: '#b5a669' }} // Custom background color for buttons
        >
          Game Menu
        </Link>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-black font-bold">Hi, {username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white font-bold rounded-lg shadow"
            style={{ backgroundColor: '#b5a669' }} // Custom background color for buttons
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="px-4 py-2 text-black font-bold rounded-lg shadow"
          style={{ backgroundColor: '#b5a669' }} // Custom background color for buttons
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;