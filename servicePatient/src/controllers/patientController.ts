// src/controllers/patientController.ts

import { Request, Response } from 'express';
import { patientService } from '../services/patientService'; // Utilisation de l'export nommé
import Patient from '../models/patientModel';// Assurez-vous que Patient est correctement exporté

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addPatient = async (req: Request<{}, {}, Patient>, res: Response) => {
  try {
    const newPatient = await patientService.addPatient(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
