import { Router, Request, Response } from 'express';
import Patient from '../models/patientModel';

const router: Router = Router();

// Ajouter un patient
router.post('/', async (req: Request, res: Response) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

// Lister les patients
router.get('/', async (req: Request, res: Response) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Récupérer un patient par ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).json({ error: 'Patient introuvable' });
        }
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Modifier un patient
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const [updated] = await Patient.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedPatient = await Patient.findByPk(req.params.id);
            res.json(updatedPatient);
        } else {
            res.status(404).json({ error: 'Patient introuvable' });
        }
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Supprimer un patient
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await Patient.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Patient introuvable' });
        }
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;
