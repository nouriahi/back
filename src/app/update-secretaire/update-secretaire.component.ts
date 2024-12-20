import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SecretaireService } from '../services/secretaire.service';
import { Secretaire } from '../models/secretaire.model';

@Component({
  selector: 'app-edit-secretaire',
  standalone: true, 
  templateUrl: './update-secretaire.component.html',
  imports: [FormsModule], 
  styleUrls: ['./update-secretaire.component.css'],
})
export class EditSecretaireComponent implements OnInit {
  secretaire: Secretaire = {
    id: 0,
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    competences: [],
  };

  constructor(
    private secretaireService: SecretaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.secretaireService.getSecretaireById(id).subscribe(
        (data) => (this.secretaire = data),
        (error) => console.error('Erreur lors de la récupération du secrétaire', error)
      );
    }
  }

  handleUpdate(): void {
    this.secretaireService.updateSecretaire(this.secretaire).subscribe(
      (response) => {
        console.log('Secrétaire mis à jour avec succès', response);
        this.router.navigate(['/secretaire-list']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour', error);
      }
    );
  }
}
