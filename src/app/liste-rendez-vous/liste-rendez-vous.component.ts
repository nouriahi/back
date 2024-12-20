import { Component } from '@angular/core';
import { RendezvousService } from '../services/rendezvous.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-rendez-vous',
  standalone: true,  // Le composant est standalone
  imports: [FormsModule,RouterLink,CommonModule,],
  templateUrl: './liste-rendez-vous.component.html',
  styleUrl: './liste-rendez-vous.component.css'
})
export class ListeRendezVousComponent {
deleteRendezVous(arg0: any) {
throw new Error('Method not implemented.');
}

searchTerm: string = '';
rendezVousList: any[] = [];
filteredRendezvous: any[] = [...this.rendezVousList];  // Initialement, la liste filtrée est la même que la liste complète

// Fonction pour filtrer les rendez-vous en fonction du terme de recherche

  constructor(private rendezVousService:RendezvousService) { }

  ngOnInit(): void {
    this.fetchRendezVousList();
  }

  fetchRendezVousList(): void {
    this.rendezVousService.getAllRendezvous().subscribe(
      data => this.rendezVousList = data,
      error => console.error('Erreur lors de la récupération des rendez-vous:', error)
    );
  }

  /*updateStatus(id: number, status: string): void {
    this.rendezVousService.updateRendezvousStatus(id, status).subscribe(
      () => this.fetchRendezVousList(),
      error => console.error('Erreur lors de la mise à jour du statut:', error)
    );
  }*/
  updateStatus(id: number, status: string): void {
    this.rendezVousService.updateRendezvousStatus(id, status).subscribe(
      () => {
        alert(`Rendez-vous ${status === 'accepted' ? 'accepté' : 'refusé'} avec succès.`);
        const shouldSendEmail = confirm('Voulez-vous envoyer un email au patient ?');
        if (shouldSendEmail) {
          this.sendEmail(id, status);
        }
        this.fetchRendezVousList();
      },
      error => console.error('Erreur lors de la mise à jour du statut:', error)
    );
  }
  
  sendEmail(id: number, status: string): void {
    this.rendezVousService.sendEmail(id, status).subscribe(
      () => alert('Email envoyé au patient avec succès.'),
      error => console.error('Erreur lors de l\'envoi de l\'email:', error)
    );
  }
  
  
  
}