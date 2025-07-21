import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserName(parsedUser.userName || parsedUser.email || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserName("");
    navigate("/login");
  };

  return (
    <nav
      className="w-full py-3 px-6 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-10"
      style={{ backgroundColor: "#5d5e5e" }}
    >
      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className="px-4 py-2 text-black font-semibold rounded-lg shadow bg-orange-500 hover:bg-orange-600 transition capitalize"
        >
          Home
        </Link>
        <Link
          to="/categories"
          className="px-4 py-2 text-black font-semibold rounded-lg shadow bg-orange-500 hover:bg-orange-600 transition capitalize"
        >
          Categories
        </Link>
        <Link
          to="/eligibilty-check"
          className="px-4 py-2 text-black font-semibold rounded-lg shadow bg-orange-500 hover:bg-orange-600 transition capitalize"
        >
          Eligibility Check
        </Link>
        <Link
          to="/int"
          className="px-4 py-2 text-black font-semibold rounded-lg shadow bg-orange-500 hover:bg-orange-600 transition capitalize"
        >
          About Us
        </Link>
        <Link
          to="/check-document"
          className="px-4 py-2 text-black font-semibold rounded-lg shadow bg-orange-500 hover:bg-orange-600 transition capitalize"
        >
          Check Document
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-white font-medium">Hi, {userName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white font-semibold rounded-lg shadow bg-orange-500 hover:bg-orange-600 transition capitalize"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-black font-semibold rounded-lg shadow bg-orange-500 hover:bg-orange-600 transition capitalize"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
