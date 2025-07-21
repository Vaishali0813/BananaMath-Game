import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import BackgroundImage from "../../assets/change.jpg";

const EligibilityCheck = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gsDivision: "",
    age: "",
    gender: "",
    status: "",
    employmentStatus: "",
    income: "",
    hasMedicalIssue: "",
    medicalIssue: "",
    hasDisability: "",
    disabilityType: "",
    receivingAid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/welfare/check-eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Navigate to result page with eligibility data
      navigate("/eligibility-result", { state: { eligibilityResult: data } });
    } catch (err) {
      console.error("Error checking eligibility:", err);
      navigate("/eligibility-result", {
        state: {
          eligibilityResult: { eligible: false, message: "Server error. Please try again later." },
        },
      });
    }
  };

  const fields = [
    { label: "GS Division", name: "gsDivision", type: "text", placeholder: "Enter GS Division" },
    { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
    { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
    { label: "Marital Status", name: "status", type: "select", options: ["Single", "Married", "Widowed"] },
    { label: "Employment Status", name: "employmentStatus", type: "select", options: ["Employed", "Unemployed", "Self-employed"] },
    { label: "Monthly Income", name: "income", type: "number", placeholder: "Enter monthly income" },
    { label: "Medical Issue?", name: "hasMedicalIssue", type: "select", options: ["Yes", "No"] },
    { label: "Medical Issue", name: "medicalIssue", type: "text", conditional: "hasMedicalIssue", placeholder: "Specify medical issue" },
    { label: "Disability?", name: "hasDisability", type: "select", options: ["Yes", "No"] },
    { label: "Disability Type", name: "disabilityType", type: "text", conditional: "hasDisability", placeholder: "Specify disability type" },
    { label: "Receiving Govt. Aid?", name: "receivingAid", type: "select", options: ["Yes", "No"] },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-25 bg-center z-0"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex-grow bg-white/0">
        <Navbar />

        <div className="max-w-md mx-auto px-4 mt-24 py-12">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Check Your Eligibility
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6"
          >
            {fields.map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label htmlFor={field.name} className="font-medium text-black mb-1">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm bg-white"
                  >
                    <option value="">Select</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    disabled={
                      (field.conditional &&
                        formData[field.conditional] !== "Yes") ||
                      false
                    }
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm bg-white"
                  />
                )}
              </div>
            ))}

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-orange-400 text-white px-8 py-2 rounded-full hover:bg-orange-500 font-semibold transition"
              >
                Check
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCheck;
