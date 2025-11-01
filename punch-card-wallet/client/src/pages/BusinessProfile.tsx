// src/pages/BusinessProfile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/token";

interface BusinessProfile {
  name: string;
  email: string;
  category?: string;
  location?: string;
  description?: string;
  phone?: string;
  avatarUrl?: string;
}

const BusinessProfile: React.FC = () => {
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBusinessProfile = async () => {
    const token = getToken();
    if (!token) return setLoading(false);

    try {
      const res = await axios.get("http://localhost:3001/api/business/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBusiness(res.data);
    } catch (err) {
      console.error("Error fetching business profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessProfile();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg text-center">
        <img
          src={business?.avatarUrl || "https://via.placeholder.com/120?text=Logo"}
          alt="Business Avatar"
          className="w-28 h-28 rounded-full mb-4 border-4 border-blue-500 object-cover mx-auto"
        />
        <h2 className="text-2xl font-bold text-gray-800">{business?.name || "Business Name"}</h2>
        <p className="text-gray-600">{business?.category}</p>
        <p className="text-gray-600">{business?.location}</p>
        <p className="text-gray-600">{business?.phone}</p>
        <p className="text-gray-600 mb-4">{business?.email}</p>
        <p className="text-gray-500">{business?.description}</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default BusinessProfile;