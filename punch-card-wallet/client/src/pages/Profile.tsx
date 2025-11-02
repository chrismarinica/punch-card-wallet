// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/token";

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = getToken();
    if (!token) {
      console.warn("No token found – user may not be logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3001/api/client/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="p-6 text-center text-gray-600">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.avatarUrl || "/cAvatar.jpg"} // ✅ Use cAvatar.jpg from public as fallback
            alt={user?.name || "User Avatar"}
            className="w-28 h-28 rounded-full mb-4 border-4 border-slate-500 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user?.name || "Client Name"}</h2>
          <p className="text-gray-600 mb-2">{user?.email || "email@example.com"}</p>
          <button className="mt-2 bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;