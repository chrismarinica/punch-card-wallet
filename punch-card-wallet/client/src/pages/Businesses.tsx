import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/token";
import axios from "axios";

// Local images (replace with your own)
import coffeeImg from "../assets/coffee.jpg";
import flowerImg from "../assets/flowers.jpg";
import gymImg from "../assets/gym.jpg";
import spaImg from "../assets/sauna.jpg";
import tattooImg from "../assets/tattoo.jpg";
import yogaImg from "../assets/yoga.jpg";

interface Business {
  _id: string;
  name: string;
  category?: string;
  location?: string;
  description?: string;
  img?: string;
}

// Sample businesses with images
const sampleBusinesses: Business[] = [
  {
    _id: "1",
    name: "Example Coffee Co.",
    category: "Cafe",
    location: "Detroit, MI",
    description: "Locally roasted coffee and fresh pastries in the heart of downtown Detroit.",
    img: coffeeImg,
  },
  {
    _id: "2",
    name: "Example Detroit Wellness Center",
    category: "Health & Wellness",
    location: "Royal Oak, MI",
    description: "Offering holistic health services, yoga, and meditation workshops.",
    img: yogaImg,
  },
  {
    _id: "3",
    name: "Example Belt Fitness",
    category: "Gym",
    location: "Ferndale, MI",
    description: "Strength and conditioning programs focused on community and results.",
    img: gymImg,
  },
  {
    _id: "4",
    name: "Example Flower Shop",
    category: "Florist",
    location: "Detroit, MI",
    description: "Artisan floral arrangements inspired by the beauty of Belle Isle.",
    img: flowerImg,
  },
  {
    _id: "5",
    name: "Example Tattoo Studio",
    category: "Tattoo Studio",
    location: "Midtown Detroit, MI",
    description: "Custom tattoos with bold designs and a clean, creative space.",
    img: tattooImg,
  },
  {
    _id: "6",
    name: "Example Spa & Sauna",
    category: "Spa",
    location: "Birmingham, MI",
    description: "Luxury spa offering massages, saunas, and wellness treatments.",
    img: spaImg,
  },
];

const Businesses: React.FC = () => {
  const [search, setSearch] = useState("");
  const { favorites, addFavorite } = useAuth();

  const handleAddFavorite = async (businessId: string) => {
    try {
      const token = getToken();
      console.log("Token being sent:", token);

      if (businessId.length === 24) {
        await axios.post(
          `http://localhost:3001/api/client/favorites/${businessId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      addFavorite(businessId);
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const filteredBusinesses = sampleBusinesses.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 via-gray-100 to-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-black-500 via-black-400 to-black-400">
        Discover Local Businesses
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search businesses..."
          className="p-3 w-full max-w-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-6 max-w-5xl mx-auto">
        {filteredBusinesses.map((b) => (
          <div
            key={b._id}
            className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={b.img || "https://via.placeholder.com/150"}
              alt={b.name}
              className="w-full sm:w-48 h-48 object-cover"
            />
            <div className="flex flex-col justify-between p-5 flex-1">
              <div>
                <h2 className="text-2xl font-semibold mb-1">{b.name}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {b.category} • {b.location}
                </p>
                <p className="text-gray-700 text-sm">{b.description}</p>
              </div>
              <div className="mt-4 self-end">
                <button
                  onClick={() => handleAddFavorite(b._id)}
                  disabled={favorites.includes(b._id)}
                  className={`px-4 py-2 rounded-lg font-medium text-white shadow-md transition-colors ${
                    favorites.includes(b._id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {favorites.includes(b._id) ? "Added" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredBusinesses.length === 0 && (
          <p className="text-center text-gray-600 italic">
            No businesses match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Businesses;