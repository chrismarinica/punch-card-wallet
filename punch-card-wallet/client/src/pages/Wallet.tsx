import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/token";

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  description: string;
}

const Wallet: React.FC = () => {
  const [favorites, setFavorites] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await axios.get("http://localhost:3001/api/client/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched favorites:", response.data);

      setFavorites(response.data); // response.data should be populated businesses
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <p>Loading favorites...</p>;

  if (favorites.length === 0) return <p>You haven’t added any favorites yet.</p>;

  return (
    <div>
      <h2>Your Favorite Businesses</h2>
      <ul>
        {favorites.map((biz) => (
          <li key={biz._id}>
            <h3>{biz.name}</h3>
            <p>{biz.category} | {biz.location}</p>
            <p>{biz.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet;