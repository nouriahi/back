"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientController_1 = require("../controllers/patientController");
const router = (0, express_1.Router)();
// Définir les routes
router.get('/', patientController_1.getPatients); // Obtenir tous les patients
exports.default = router;
