import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js'; // adjust path if needed

export const registerClient = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // prevent duplicate clients
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    const newClient = await Client.create({ name, email });

    // generate a JWT token
    const token = jwt.sign(
      { id: newClient._id },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Client registered successfully', token, client: newClient });
  } catch (error) {
    res.status(500).json({ message: 'Error registering client', error });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};