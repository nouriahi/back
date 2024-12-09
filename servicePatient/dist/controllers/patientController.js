"use strict";
// src/controllers/patientController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getPatients = void 0;
const patientService_1 = require("../services/patientService"); // Utilisation de l'export nommé
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patientService_1.patientService.getAllPatients();
        res.json(patients);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPatients = getPatients;
const addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPatient = yield patientService_1.patientService.addPatient(req.body);
        res.status(201).json(newPatient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addPatient = addPatient;
