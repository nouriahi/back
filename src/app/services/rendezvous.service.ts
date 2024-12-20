import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from '../models/medecin.model';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  private baseRendezvousUrl = 'http://localhost:8084/api/rendezvous';
  private baseMedecinsUrl = 'http://localhost:8084/api/rendezvous/medecins';

  constructor(private http: HttpClient) {}

  // Récupérer tous les médecins
  
  getAllMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.baseMedecinsUrl}`);
  }

  // Créer un rendez-vous
  createRendezvous(data: any): Observable<any> {
    return this.http.post(`${this.baseRendezvousUrl}`, data);
  }

  // Récupérer tous les rendez-vous
  getAllRendezvous(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseRendezvousUrl}`);
  }

  // Mettre à jour le statut d'un rendez-vous
  updateRendezvousStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseRendezvousUrl}/${id}/status`, { status: status });
  }
  
  getRendezVousList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseRendezvousUrl);
  }

  /*updateRendezVousStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseRendezvousUrl}/${id}/status?status=${status}`, {});
  }*/
  sendEmail(id: number, status: string): Observable<any> {
    return this.http.post(`${this.baseRendezvousUrl}/${id}/send-email?status=${status}`, {});
  }
  deleteRendezVous(id: number): Observable<any> {
    return this.http.delete(`${this.baseRendezvousUrl}/${id}`);
  }
  searchByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseRendezvousUrl}/search?name=${name}`);
  }
  
  
}
