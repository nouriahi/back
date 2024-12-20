import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Pour le binding [(ngModel)]
import { MedecinService } from '../services/medecin.service';
import { SecretaireService } from '../services/secretaire.service';
import { Medecin } from '../models/medecin.model';
import { Secretaire } from '../models/secretaire.model';
import { MedecinCreationDto } from '../models/medecin-creation-dto.model';

@Component({
  selector: 'app-affecter-secretaire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './affecter-secretaire.component.html',
  styleUrls: ['./affecter-secretaire.component.css'],
})
export class AffecterSecretaireComponent implements OnInit {
  medecins: Medecin[] = [];
  secretaires: Secretaire[] = [];
  selectedMedecinId: number | null = null;
  selectedSecretaireId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  affectations:MedecinCreationDto[]=[];

  constructor(
    private medecinService: MedecinService,
    private secretaireService: SecretaireService
  ) {}

  ngOnInit(): void {
    this.loadMedecins();
    this.loadSecretaires();
    this.loadAffectations();
  }
  
    loadAffectations(): void {
      this.medecinService.getAffectations().subscribe(
        (data: any[]) => {
          this.affectations = data;
        },
        (error) => {
          this.errorMessage = 'Erreur lors du chargement des affectations.';
        }
      );
    }
  

  // Charger la liste des médecins
  loadMedecins(): void {
    this.medecinService.getAllMedecins().subscribe(
      (data: Medecin[]) => {
        this.medecins = data;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des médecins.';
      }
    );
  }

  // Charger la liste des secrétaires
  loadSecretaires(): void {
    this.secretaireService.getAllSecretaires().subscribe(
      (data: Secretaire[]) => {
        this.secretaires = data;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des secrétaires.';
      }
    );
  }

 
  affecterSecretaire(): void {
    if (this.selectedMedecinId && this.selectedSecretaireId) {
      this.medecinService.assignSecretaireToMedecin(this.selectedMedecinId, this.selectedSecretaireId)
        .subscribe(
          (response) => {
            this.successMessage = 'Secrétaire affectée avec succès !';
            this.errorMessage = '';
            setTimeout(() => (this.successMessage = ''), 3000);
          },
          (error) => {
            this.errorMessage = 'Secrétaire affectée avec succès ';
            setTimeout(() => (this.errorMessage = ''), 3000);
          }
        );
    } else {
      this.errorMessage = 'Veuillez sélectionner un médecin et une secrétaire.';
    }
  }}