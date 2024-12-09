import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../services/medecin.service';
import { Router ,RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MedecinCreationDto } from '../models/medecin-creation-dto.model';
import { SecretaireService } from '../services/secretaire.service';
import { Medecin } from '../models/medecin.model';
@Component({
  selector: 'app-ajout-medecin',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './ajout-medecin.component.html',
  styleUrls: ['./ajout-medecin.component.css'] // Correction ici
})

export class AjoutMedecinComponent implements OnInit {

  medecinData: Medecin = {
    id:0,
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    specialite:'',
    description: '',
    langues: []
    //secretaireId: ''
  };

  secretaireList: any[] = [];
  errorMessage: string = '';
  selectedSecretaireId: string = '';
  languesDisponibles: string[] = ['Français', 'Anglais', 'Espagnol', 'Arabe', 'Allemand', 'Italien'];

  constructor(
    private medecinService: MedecinService,
    private secretaireService: SecretaireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.secretaireService.getAllSecretaires().subscribe((data: any[]) => {
      this.secretaireList = data;
    });
  }

/* handleSubmit() {
    this.medecinData.secretaireId = this.selectedSecretaireId;
  
    if (!this.medecinData.secretaireId) {
      this.showError('Veuillez sélectionner une secrétaire.');
      return;
    }
  
    // Envoie des données via POST dans le corps de la requête
    this.medecinService.createMedecinWithSecretaire(this.medecinData).subscribe({
      next: () => this.router.navigate(['/liste_Medecin']),
      error: (error) => this.showError('Erreur lors de la création du médecin.')
    });
  }

   handleSubmit() {
      this.medecinData.secretaireId = this.selectedSecretaireId;
    
      if (!this.medecinData.secretaireId) {
        this.showError('Veuillez sélectionner une secrétaire.');
        return;
      }
    
      console.log('Données envoyées au backend :', this.medecinData); // Debug
    
      this.medecinService.creerMedecinAvecSecretaire(this.medecinData).subscribe({
        next: () => this.router.navigate(['/liste_Medecin']),
        error: (error) => {
          console.error('Erreur lors de la création du médecin :', error); // Debug
          this.showError('Erreur lors de la création du médecin.');
        }
      });
    }*/
    handleSubmit(): void {
      this.medecinService.creerMedecinsSansSecretaire(this.medecinData).subscribe({
        next: (response) => {
          console.log('Médecin ajouté:', response);
          alert('Médecin ajouté avec succès !');
          this.router.navigate(['/liste_Medecin']); 
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout:', error);
        }
      });
    }
    
  
  
  

  

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }


  onLangueChange(event: any) {
    const langue = event.target.value;
    if (event.target.checked) {
      this.medecinData.langues.push(langue);
    } else {
      this.medecinData.langues = this.medecinData.langues.filter((l) => l !== langue);
    }
  }
  
}
