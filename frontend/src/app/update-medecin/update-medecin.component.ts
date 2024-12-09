import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedecinService } from '../services/medecin.service';
import { Medecin } from '../models/medecin.model';

@Component({
  selector: 'app-edit-medecin',
  standalone: true, 
  templateUrl: './update-medecin.component.html',
  imports: [FormsModule], 
  styleUrls: ['./update-medecin.component.css'],
})
export class UpdateMedecinComponent implements OnInit {
  medecin: Medecin = {
    id: 0,
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    specialite: '',
    langues: [],
    description: '',
  };

  constructor(
    private medecinService: MedecinService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.medecinService.getMedecinById(id).subscribe(
        (data) => (this.medecin = data),
        (error) => console.error('Erreur lors de la récupération du médecin', error)
      );
    }
  }

  handleUpdate(): void {
    this.medecinService.updateMedecin(this.medecin).subscribe(
      (response) => {
        console.log('Médecin mis à jour avec succès', response);
        this.router.navigate(['/liste_Medecin']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour', error);
      }
    );
  }
}
