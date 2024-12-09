import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Assurez-vous que le chemin pointe vers votre fichier de configuration Sequelize

// Définition des attributs du modèle Patient
interface PatientAttributes {
    id: number;
    nom: string;
    prenom: string;
    date_naissance: Date;
    adresse?: string; // Optionnel
}

// Les champs optionnels lors de la création
interface PatientCreationAttributes extends Optional<PatientAttributes, 'id'> {}

// Classe Sequelize pour le modèle Patient
class Patient extends Model<PatientAttributes, PatientCreationAttributes> implements PatientAttributes {
    public id!: number;
    public nom!: string;
    public prenom!: string;
    public date_naissance!: Date;
    public adresse?: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Définir le modèle Patient
Patient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_naissance: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        adresse: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, // Instance Sequelize
        modelName: 'Patient', // Nom du modèle
        tableName: 'patients', // Nom de la table
        timestamps: true, // Ajoute createdAt et updatedAt
    }
);

export default Patient;
