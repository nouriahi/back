export interface Secretaire {
  id: number; // Identifiant unique
  nom: string; // Nom
  prenom: string; // Prénom
  tel: string; // Numéro de téléphone
  email: string; // Adresse e-mail
  competences: string[]; // Liste des compétences (optionnel)
}
