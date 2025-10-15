import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Business from "./pages/Business";
import Client from "./pages/Client";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";
import BusinessAuth from "./pages/BusinessAuth";
import ClientAuth from "./pages/ClientAuth";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  const { userType } = useAuth();

  return (
    <div>
      {/* Navbar only shows if user has logged in */}
      {userType && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-auth" element={<BusinessAuth />} />
        <Route path="/client-auth" element={<ClientAuth />} />

        {/* Protected Routes */}
        <Route
          path="/business"
          element={
            <PrivateRoute allowedUserType="business">
              <Business />
            </PrivateRoute>
          }
        />
        <Route
          path="/client"
          element={
            <PrivateRoute allowedUserType="client">
              <Client />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;