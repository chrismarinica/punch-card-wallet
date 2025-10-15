// src/pages/Business.tsx
import React from "react";

const Business: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Business Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome! Here you’ll manage your services and clients.</p>
      <button
        onClick={() => alert("Feature coming soon!")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Manage My Business
      </button>
    </div>
  );
};

export default Business;