export interface RendezVous {
    id?: number; // Optionnel, car il est généré par la base
    patientId: number; // ID du patient
    medecinId: number; // ID du médecin
    rendezVousDate: string; // Date et heure du rendez-vous
    status?: string; // Statut optionnel (par défaut 'pending')
    createdAt?: string; // Optionnel
    updatedAt?: string; // Optionnel
    email: string; // Email du patient
    nom: string; // Nom du patient
    prenom: string; // Prénom du patient
  }
  