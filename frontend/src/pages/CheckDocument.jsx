import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/change.jpg";

const CheckDocument = () => {
  const [selectedDocType, setSelectedDocType] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationMessage, setValidationMessage] = useState("");

  const handleDocTypeChange = (e) => {
    setSelectedDocType(e.target.value);
    setFile(null);
    setUploadProgress(0);
    setValidationMessage("");
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0] || e.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      simulateUpload(selectedFile);
    }
  };

  const simulateUpload = (selectedFile) => {
    setUploadProgress(0);
    setValidationMessage("");
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        validateFile(selectedFile);
      } else {
        progress += 5;
        setUploadProgress(progress);
      }
    }, 100);
  };

  const validateFile = (file) => {
    const fileName = file.name.toLowerCase();

    if (selectedDocType === "nic" && fileName.includes("nic")) {
      setValidationMessage("✅ NIC Copy validated successfully.");
    } else if (selectedDocType === "gs" && fileName.includes("gs")) {
      setValidationMessage("✅ GS Certification validated successfully.");
    } else if (
      selectedDocType === "medical" &&
      (fileName.includes("medical") || fileName.includes("doctor"))
    ) {
      setValidationMessage("✅ Medical/Doctor Certification validated successfully.");
    } else if (
      selectedDocType === "family" &&
      (fileName.includes("family") || fileName.includes("card"))
    ) {
      setValidationMessage("✅ Family Card validated successfully.");
    } else {
      setValidationMessage("❌ Uploaded file doesn't match the selected document type.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-25 bg-center z-0"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>

      <div className="relative z-10 flex-grow bg-white/0">
        <Navbar />

        <div className="max-w-xl mx-auto px-4 mt-24 py-12">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Validate your Documents
          </h2>

          <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-6">
            <p className="text-black text-center mb-4 font-semibold">
              Select the document type.
            </p>

            {/* Select Document Type */}
            <div className="mb-6 text-center">
              <select
                value={selectedDocType}
                onChange={handleDocTypeChange}
                className="p-2 rounded border border-gray-300 text-black"
              >
                <option value="">-- Select Document --</option>
                <option value="nic">NIC Copy</option>
                <option value="gs">GS Certification</option>
                <option value="medical">Medical/Doctor Certification</option>
                <option value="family">Family Card</option>
              </select>
            </div>

            {/* Drag & Drop Area */}
            {selectedDocType && (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-orange-400 p-8 text-center rounded-lg bg-white/60 cursor-pointer"
              >
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFile}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer block">
                  <div className="text-blue-600 text-2xl mb-2">⬆️</div>
                  <p className="text-black">Drag your file here</p>
                  <p className="text-gray-600">or</p>
                  <button
                    onClick={() => document.getElementById("fileInput").click()}
                    className="mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Browse
                  </button>
                </label>
              </div>
            )}

            {/* Upload Progress & Validation */}
            {file && (
              <div className="mt-6 bg-white p-4 rounded shadow-md">
                <p className="font-semibold text-black text-sm mb-2">{file.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">
                  {uploadProgress < 100 ? "Uploading..." : "Upload complete"}
                </p>
              </div>
            )}

            {/* Validation Message */}
            {validationMessage && (
              <div
                className={`mt-4 p-3 text-sm rounded font-medium ${
                  validationMessage.startsWith("✅")
                    ? "text-green-700 bg-green-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                {validationMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckDocument;
