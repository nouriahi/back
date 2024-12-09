// src/config/appConfig.ts
import dotenv from 'dotenv';

// Charger les variables d'environnement à partir d'un fichier .env
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'mydatabase',
};
