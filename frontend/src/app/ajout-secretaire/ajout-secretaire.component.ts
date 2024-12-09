
import { Component } from '@angular/core';
import { SecretaireService } from '../services/secretaire.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';  // Importez Router pour la redirection
import { Secretaire } from '../models/secretaire.model';

@Component({
  selector: 'app-ajout-secretaire',
  standalone: true,  // Le composant est standalone
  imports: [FormsModule,RouterLink],  // Importez FormsModule ici
  templateUrl: './ajout-secretaire.component.html',
  styleUrls: ['./ajout-secretaire.component.css']
})

export class AjoutSecretaireComponent {
  secretaire: Secretaire = {
    id:0,
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    competences: []
  };


  constructor(
    private secretaireService: SecretaireService,
    private router: Router  // Ajoutez Router pour la redirection
  ) {}

  handleSubmit() {
    this.secretaireService.ajouterSecretaire(this.secretaire).subscribe(
      response => {
        console.log('Secrétaire ajoutée avec succès', response);
        this.router.navigate(['/secretaire-list']); 
         // Rediriger vers la liste des secrétaires
      },
      error => {
        console.error('Erreur lors de l\'ajout de la secrétaire', error);
      }
    );
  }

}
