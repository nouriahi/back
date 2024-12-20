import { Component, OnInit } from '@angular/core';
import { RendezvousService } from '../services/rendezvous.service';
import { RendezVous } from '../models/rendezVous';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve-rendezvous',
  standalone: true, // Composant autonome
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './reserve-rendez-vous.component.html',
  styleUrls: ['./reserve-rendez-vous.component.css'],
})
export class ReserveRendezVousComponent implements OnInit {
  // Définir un modèle avec tous les champs nécessaires
  rendezvousForm: Partial<RendezVous> = {
    patientId: 1, // ID du patient, à remplacer dynamiquement
    nom: '', // Nom du patient
    prenom: '', // Prénom du patient
    email: '', // Email du patient
    medecinId: 0, // Médecin sélectionné
    rendezVousDate: '', // Date et heure du rendez-vous
  };

  medecins: { id: number; nom: string; prenom: string }[] = []; // Liste des médecins disponibles

  constructor(private rendezvousService: RendezvousService) {}

  ngOnInit(): void {
    this.loadMedecins(); // Charger la liste des médecins au démarrage
  }

  // Charger les médecins depuis le backend
  loadMedecins(): void {
    this.rendezvousService.getAllMedecins().subscribe({
      next: (data) => {
        this.medecins = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des médecins', error);
        alert('Impossible de charger la liste des médecins.');
      },
    });
  }

  // Soumettre le rendez-vous
  onSubmit(): void {
    const { patientId, nom, prenom, email, medecinId, rendezVousDate} = this.rendezvousForm;

    // Validation des champs
    if (!nom || !prenom || !email || !medecinId || !rendezVousDate) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Créer un objet rendez-vous
    const rendezvous: RendezVous = {
      patientId: patientId!, // Récupéré dynamiquement dans une vraie application
      nom: nom!,
      prenom: prenom!,
      email: email!,
      medecinId: medecinId!,
      rendezVousDate: rendezVousDate!,
      status: 'pending', // Statut par défaut
    };

    // Appel au service pour enregistrer le rendez-vous
    this.rendezvousService.createRendezvous(rendezvous).subscribe({
      next: () => {
        alert('Rendez-vous pris avec succès.');
        this.resetForm(); // Réinitialiser le formulaire après succès
      },
      error: (error) => {
        console.error('Erreur lors de la prise du rendez-vous', error);
        alert('Erreur lors de la prise du rendez-vous.');
      },
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.rendezvousForm = {
      patientId: 1, // ID du patient à réinitialiser
      nom: '',
      prenom: '',
      email: '',
      medecinId: 0,
      rendezVousDate: '',
    };
  }
}
