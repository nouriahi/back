import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { CommonModule } from '@angular/common';
import { Medecin } from '../models/medecin.model';

@Component({
  selector: 'app-medecin-list',
  templateUrl: './medecin-list.component.html',
  styleUrls: ['./medecin-list.component.css'],
  standalone: true, // Pour activer le mode standalone (facultatif selon votre configuration Angular)
  imports: [CommonModule]
})
export class MedecinListComponent implements OnInit {

  medecins: any[] = []; // Liste des médecins récupérés
  errorMessage: string = ''; // Message d'erreur
  successMessage: string = ''; // Message de succès (par exemple, après suppression)

  constructor(
    private medecinService: MedecinService, // Service pour interagir avec l'API
    private router: Router // Pour naviguer entre les routes
  ) {}

  ngOnInit(): void {
    this.loadMedecins(); // Charger les médecins au démarrage
  }

  // Charger tous les médecins depuis le service
  loadMedecins(): void {
    this.medecinService.getAllMedecins().subscribe(
      (data) => {
        console.log('Médecins récupérés :', data);
        this.medecins = data;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des médecins.';
        console.error('Erreur API:', error);
      }
    );
  }

  // Naviguer vers le formulaire de modification pour un médecin donné
  navigateToUpdate(medecinId: number): void {
    this.router.navigate(['/update-medecin', medecinId]);
  }

  // Supprimer un médecin
  deleteMedecin(medecinId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.medecinService.deleteMedecin(medecinId).subscribe({
        next: () => {
          // Supprimer le médecin de la liste locale
          this.medecins = this.medecins.filter((m) => m.id !== medecinId);
          console.log('Médecin supprimé avec succès.');
          this.successMessage = 'Médecin supprimé avec succès.';
          setTimeout(() => (this.successMessage = ''), 3000); // Efface le message après 3 secondes
          
          // Rafraîchir la liste des médecins après la suppression
          this.refreshMedecinsList();
        },
       
      });
    }
  }
  
  refreshMedecinsList(): void {
    this.medecinService.getAllMedecins().subscribe({
      next: (medecins) => {
        this.medecins = medecins;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du rafraîchissement de la liste des médecins.';
        console.error('Erreur API:', error);
      }
    });
  }
  assignSecretaire(medecins:Medecin): void {
    this.router.navigate(['/assign-secretaire', medecins.id]);
}  }