"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Créez une nouvelle instance de Sequelize avec les paramètres de connexion
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root', // Remplacez par votre nom d'utilisateur MySQL
    password: 'password', // Remplacez par votre mot de passe MySQL
    database: 'service_patient', // Nom de votre base de données
});
// Test de la connexion
sequelize.authenticate()
    .then(() => {
    console.log('Database connected successfully!');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize; // Assurez-vous que l'exportation est bien en tant que default
