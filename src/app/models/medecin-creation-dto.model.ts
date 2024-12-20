import { Secretaire } from "./secretaire.model";

export interface MedecinCreationDto {
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  specialite: string;
  description: string;
  langues: string[];
  secretaireId: Secretaire;
}
