const Rendezvous = require('../models/rendezvous');

// Créer un rendez-vous
exports.createRendezvous = async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_date } = req.body;
        const rendezvous = await Rendezvous.create({ patient_id, doctor_id, appointment_date });
        res.status(201).json(rendezvous);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les rendez-vous
exports.getAllRendezvous = async (req, res) => {
    try {
        const rendezvous = await Rendezvous.findAll();
        res.status(200).json(rendezvous);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Rconst Rendezvous = require('../models/rendezvous');

// Fonction pour créer un rendez-vous
exports.createRendezvous = async (req, res) => {
    try {
      const { patient_id, medecin_id, rendezvous_date, status } = req.body;
  
      // Créer un rendez-vous
      const newRendezvous = await Rendezvous.create({
        patient_id,
        medecin_id,
        rendezvous_date,
        status,
      });
  
      res.status(201).json(newRendezvous);  // Retourne le rendez-vous créé
    } catch (err) {
      console.error('Erreur lors de la création du rendez-vous :', err);
      res.status(500).json({ error: 'Erreur lors de la création du rendez-vous' });
    }
  };
  
  // Lire tous les rendez-vous
  exports.getAllRendezvous = async (req, res) => {
    try {
      const rendezvousList = await Rendezvous.findAll();
      res.status(200).json(rendezvousList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Lire un rendez-vous par ID
  exports.getRendezvousById = async (req, res) => {
    try {
      const { id } = req.params;
      const rendezvous = await Rendezvous.findByPk(id);
      if (!rendezvous) return res.status(404).json({ error: 'Rendez-vous introuvable' });
      res.status(200).json(rendezvous);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Mettre à jour un rendez-vous
  exports.updateRendezvous = async (req, res) => {
    try {
      const { id } = req.params;
      const { patient_id, medecin_id, rendezvous_date, status } = req.body;
      const updated = await Rendezvous.update(
        { patient_id, medecin_id, rendezvous_date, status },
        { where: { id } }
      );
      if (!updated[0]) return res.status(404).json({ error: 'Rendez-vous introuvable' });
      res.status(200).json({ message: 'Rendez-vous mis à jour' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Supprimer un rendez-vous
  exports.deleteRendezvous = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Rendezvous.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ error: 'Rendez-vous introuvable' });
      res.status(200).json({ message: 'Rendez-vous supprimé' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  //écupérer un rendez-vous par ID
exports.getRendezvousById = async (req, res) => {
    try {
        const rendezvous = await Rendezvous.findByPk(req.params.id);
        if (!rendezvous) return res.status(404).json({ message: 'Rendez-vous not found' });
        res.status(200).json(rendezvous);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un rendez-vous
exports.deleteRendezvous = async (req, res) => {
    try {
        const rows = await Rendezvous.destroy({ where: { id: req.params.id } });
        if (!rows) return res.status(404).json({ message: 'Rendez-vous not found' });
        res.status(200).json({ message: 'Rendez-vous deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
