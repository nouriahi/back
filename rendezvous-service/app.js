const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const rendezvousRoutes = require('./routes/rendezvousRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/rendezvous', rendezvousRoutes);

// Démarrage du serveur

app.use(express.json());

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${process.env.PORT}`);
});