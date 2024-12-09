import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Ajout pour la navigation
import { SecretaireService } from '../services/secretaire.service';
import { Secretaire } from '../models/secretaire.model';

@Component({
  selector: 'app-secretaire-list',
  templateUrl: './secretaire-list.component.html',
  styleUrls: ['./secretaire-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajout de RouterModule
})
export class SecretaireListComponent implements OnInit {
  secretaires: Secretaire[] = []; // Initialisation de la liste des secrétaires

  constructor(
    private secretaireService: SecretaireService,
    private router: Router // Injection du routeur
  ) {}

  ngOnInit(): void {
    this.loadSecretaires(); // Chargement des secrétaires à l'initialisation
  }

  // Méthode pour charger les secrétaires
  loadSecretaires(): void {
    this.secretaireService.getAllSecretaires().subscribe({
      next: (data: Secretaire[]) => {
        this.secretaires = data; // Mise à jour des données
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des secrétaires :', error); // Gestion des erreurs
      },
    });
  }

  // Méthode pour supprimer un secrétaire
  deleteSecretaire(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce secrétaire ?')) {
      this.secretaireService.deleteSecretaire(id).subscribe({
        next: () => {
          // Supprimer le secrétaire de la liste
          this.secretaires = this.secretaires.filter((s) => s.id !== id);
          console.log('Secrétaire supprimé avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du secrétaire :', error);
        },
      });
    }
  }
  

  // Méthode pour naviguer vers la page d'édition
  updateSecretaire(secretaire: Secretaire): void {
    this.router.navigate(['/secretaire-edit', secretaire.id]); // Navigation avec l'ID
  }
}




