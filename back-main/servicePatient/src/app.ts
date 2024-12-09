import express, { Application, Request, Response } from 'express';
import sequelize from './config/database'; // Configuration Sequelize
import Patient from './models/patientModel';

// Création de l'application Express
const app: Application = express();

// Middleware pour parser le JSON
app.use(express.json());

// Test de connexion à la base de données
sequelize
    .authenticate()
    .then(() => console.log('Connexion réussie à la base de données.'))
    .catch((err) => console.error('Erreur de connexion :', err));

// Synchronisation de la base de données avec le modèle
sequelize
    .sync({ alter: true }) // Met à jour la table si le modèle change
    .then(() => console.log('Base de données synchronisée.'))
    .catch((err) => console.error('Erreur de synchronisation :', err));

// Routes CRUD pour le modèle Patient

// **Créer un patient (POST)**
app.post('/patients', async (req: Request, res: Response) => {
    try {
        const { nom, prenom, date_naissance, adresse } = req.body;

        // Validation des champs requis
        if (!nom || !prenom || !date_naissance) {
            return res
                .status(400)
                .json({ message: 'Les champs nom, prenom, et date_naissance sont obligatoires.' });
        }

        const patient = await Patient.create({ nom, prenom, date_naissance, adresse });
        return res.status(201).json(patient); // 201 : Ressource créée
    } catch (error) {
        console.error('Erreur lors de la création du patient :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// **Récupérer tous les patients (GET)**
app.get('/patients', async (_req: Request, res: Response) => {
    try {
        const patients = await Patient.findAll();
        return res.status(200).json(patients);
    } catch (error) {
        console.error('Erreur lors de la récupération des patients :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// **Récupérer un patient par ID (GET)**
app.get('/patients/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient non trouvé.' });
        }

        return res.status(200).json(patient);
    } catch (error) {
        console.error('Erreur lors de la récupération du patient :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// **Mettre à jour un patient par ID (PUT)**
app.put('/patients/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nom, prenom, date_naissance, adresse } = req.body;

        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient non trouvé.' });
        }

        // Mettre à jour les champs
        patient.nom = nom || patient.nom;
        patient.prenom = prenom || patient.prenom;
        patient.date_naissance = date_naissance || patient.date_naissance;
        patient.adresse = adresse || patient.adresse;

        await patient.save(); // Sauvegarder les modifications
        return res.status(200).json(patient);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du patient :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// **Supprimer un patient par ID (DELETE)**
app.delete('/patients/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient non trouvé.' });
        }

        await patient.destroy(); // Supprimer le patient
        return res.status(200).json({ message: 'Patient supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du patient :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Port d'écoute du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

export default app;
