// src/pages/Businesses.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/token";
import axios from "axios";

interface Business {
  _id: string;
  name: string;
  category?: string;
  location?: string;
  description?: string;
}

// Sample businesses for UI/demo
const sampleBusinesses: Business[] = [
  {
    _id: "1",
    name: "Example Coffee Co.",
    category: "Cafe",
    location: "Detroit, MI",
    description: "Locally roasted coffee and fresh pastries in the heart of downtown Detroit.",
  },
  {
    _id: "2",
    name: "Example Detroit Wellness Center",
    category: "Health & Wellness",
    location: "Royal Oak, MI",
    description: "Offering holistic health services, yoga, and meditation workshops.",
  },
  {
    _id: "3",
    name: "Example Belt Fitness",
    category: "Gym",
    location: "Ferndale, MI",
    description: "Strength and conditioning programs focused on community and results.",
  },
  {
    _id: "4",
    name: "Example Flower Shop",
    category: "Florist",
    location: "Detroit, MI",
    description: "Artisan floral arrangements inspired by the beauty of Belle Isle.",
  },
  {
    _id: "5",
    name: "Example Tattoo Studio",
    category: "Tattoo Studio",
    location: "Midtown Detroit, MI",
    description: "Custom tattoos with bold designs and a clean, creative space.",
  },
  {
    _id: "6",
    name: "Example Spa & Sauna",
    category: "Spa",
    location: "Birmingham, MI",
    description: "Luxury spa offering massages, saunas, and wellness treatments.",
  },
];

const Businesses: React.FC = () => {
  const [search, setSearch] = useState("");
  const { favorites, addFavorite } = useAuth();

  const handleAddFavorite = async (businessId: string) => {
    try {
      const token = getToken();
      console.log("Token being sent:", token);

      // Attempt API call only if businessId looks like a real ObjectId
      if (businessId.length === 24) {
        await axios.post(
          `http://localhost:3001/api/client/favorites/${businessId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Add to context favorites anyway for demo/sample businesses
      addFavorite(businessId);
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const filteredBusinesses = sampleBusinesses.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Businesses</h1>

      <input
        type="text"
        placeholder="Search businesses..."
        className="mb-6 p-2 w-full max-w-md border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="w-full max-w-3xl divide-y divide-gray-300">
        {filteredBusinesses.map((b) => (
          <li key={b._id} className="py-4 flex justify-between items-center bg-white p-4 rounded mb-2 shadow-sm">
            <div>
              <p className="font-bold text-lg">{b.name}</p>
              {b.description && <p className="text-gray-600">{b.description}</p>}
              {b.location && <p className="text-gray-500">{b.location}</p>}
            </div>
            <button
              onClick={() => handleAddFavorite(b._id)}
              disabled={favorites.includes(b._id)}
              className={`px-4 py-2 rounded font-semibold ${
                favorites.includes(b._id) ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {favorites.includes(b._id) ? "Added" : "Add"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Businesses;