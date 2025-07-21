import React from "react";
import Navbar from "../components/Navbar.jsx";
import bgImage from "../assets/menu1.jpg";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-start justify-center bg-cover bg-center px-4 relative"
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Left Aligned */}
      <div className="flex flex-col items-start justify-center text-left mt-20 ml-10"> 
        <h1 className="text-7xl font-bold bg-white text-transparent bg-clip-text">
          SMART-WELFARE
        </h1>

        <p className="text-3xl italic mt-4 font-bold text-white">
          Bridging the gap between
        </p>
        <p className="text-3xl italic font-bold text-white">
          need and support
        </p>
      </div>
    </div>
  );
};

export default Home;
