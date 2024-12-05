"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const patientModel_1 = require("./models/patientModel"); // Importation nommée du modèle Patient
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Endpoint pour ajouter un patient
app.post('/patients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, dateOfBirth, phoneNumber, email } = req.body;
        // Créez un nouveau patient dans la base de données
        const newPatient = yield patientModel_1.Patient.create({
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber,
            email,
        });
        // Réponse avec le patient créé
        res.status(201).json(newPatient);
    }
    catch (error) {
        // Erreur inconnue -> gestion de type 'unknown'
        res.status(500).json({ message: error.message });
    }
}));
// Synchronisation de la base de données avec les modèles
database_1.default.sync({ force: false }).then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
