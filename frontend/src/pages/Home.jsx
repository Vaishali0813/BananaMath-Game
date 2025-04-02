import React from "react";
import Navbar from "../components/Navbar.jsx";
import bgImage from "../assets/menu1.jpg"; 

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 relative"
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: "cover", // Ensures the image covers the entire background
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Centered */}
      <div className="flex flex-col items-center justify-center text-center"> 
        <h1 className="text-7xl font-extrabold bg-black text-transparent bg-clip-text">
          Welcome to
        </h1>
        <h1 className="text-7xl font-extrabold bg-black text-transparent bg-clip-text">
          Banana Math
        </h1>
        <p className="text-3xl italic mt-4 font-bold" style={{ color: '#b5a669' }}> {/* Updated color */}
          A Fun Way to
        </p>
        <p className="text-3xl italic font-bold" style={{ color: '#b5a669' }}> {/* Updated color */}
          Crunch Numbers!
        </p>
      </div>
    </div>
  );
};

export default Home;