import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bgImage from '../assets/wel.jpeg';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Centered Form */}
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center w-full max-w-xl min-h-[500px] flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-black mb-10">Categories</h1>
            <div className="space-y-6 flex flex-col items-center">
              {["Medical Welfare", "Elderly Welfare", "Disability Welfare"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="w-3/4 bg-gray-300 hover:bg-gray-400 text-black font-semibold text-xl py-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
