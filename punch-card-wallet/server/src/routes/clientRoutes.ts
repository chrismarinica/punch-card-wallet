import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client, { IClient } from "../models/Client.js";
import mongoose from "mongoose";
import { verifyToken } from "../middleware/auth"; // make sure your auth middleware sets req.clientId

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Register a client
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log("Client registration attempt:", { name, email });

    const existing = await Client.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = await Client.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newClient._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Client registered successfully:", newClient._id);

    res.status(201).json({ token, client: { id: newClient._id, name, email } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login a client
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Client login attempt:", { email });

    const client = await Client.findOne({ email });
    if (!client) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, client.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: client._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Client logged in successfully:", client._id);

    res.json({ token, client: { id: client._id, name: client.name, email: client.email } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a business to favorites (using JWT)
router.post("/favorites/:businessId", verifyToken, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId; // <-- from JWT via verifyToken middleware
    const { businessId } = req.params;

    if (!clientId) return res.status(401).json({ message: "Unauthorized" });

    const client = await Client.findById<IClient>(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    if (!client.favoriteBusinesses) client.favoriteBusinesses = [];

    const businessObjectId = new mongoose.Types.ObjectId(businessId);

    if (!client.favoriteBusinesses.some((id) => id.equals(businessObjectId))) {
      client.favoriteBusinesses.push(businessObjectId);
      await client.save();
    }

    res.json({ message: "Business added to favorites", favoriteBusinesses: client.favoriteBusinesses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a client's favorite businesses (using JWT)
router.get("/favorites", verifyToken, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    if (!clientId) return res.status(401).json({ message: "Unauthorized" });

    const client = await Client.findById(clientId).populate("favoriteBusinesses");
    if (!client) return res.status(404).json({ message: "Client not found" });

    res.json(client.favoriteBusinesses);
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;