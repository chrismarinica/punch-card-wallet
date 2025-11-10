// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

// Import the images from your assets folder
import BusinessImg from "../assets/business.jpg";
import ClientImg from "../assets/client.jpg";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-16 text-center animate-pulse">
        Welcome to PunchCardWallet
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Business Section */}
        <Link
          to="/business-auth"
          className="bg-gradient-to-br from-slate-400 via-white-400 to-neutral-500 rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center transform hover:scale-105 hover:shadow-3xl transition-all duration-300"
        >
          <img
            src={BusinessImg}
            alt="Business"
            className="w-40 h-40 mb-6 rounded-full border-4 border-white object-cover shadow-md"
          />
          <h2 className="text-3xl font-bold text-white mb-3">For Businesses</h2>
          <p className="text-white text-center text-lg">
            Manage your punches, rewards, and customer engagement.
          </p>
        </Link>

        {/* Client Section */}
        <Link
          to="/client-auth"
          className="bg-gradient-to-br from-slate-400 via-white-400 to-neutral-500 rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center transform hover:scale-105 hover:shadow-3xl transition-all duration-300"
        >
          <img
            src={ClientImg}
            alt="Client"
            className="w-40 h-40 mb-6 rounded-full border-4 border-white object-cover shadow-md"
          />
          <h2 className="text-3xl font-bold text-white mb-3">For Clients</h2>
          <p className="text-white text-center text-lg">
            Track your rewards, view punch history, and redeem offers.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;