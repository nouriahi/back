const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rendezvous = sequelize.define('Rendezvous', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medecin_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rendezvous_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

(async () => {
  await sequelize.sync({ alter: true });
  console.log('Table Rendezvous synchronisée.');
})();

module.exports = Rendezvous;
