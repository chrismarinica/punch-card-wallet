// src/pages/Client.tsx
import React from "react";

const Client: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome! Here you can track your rewards, view punch history, and redeem offers.
      </p>
      <button
        onClick={() => alert("Feature coming soon!")}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        View My Rewards
      </button>
    </div>
  );
};

export default Client;