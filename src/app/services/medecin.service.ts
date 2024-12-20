import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { Medecin } from '../models/medecin.model';
import { MedecinCreationDto } from '../models/medecin-creation-dto.model';
import { KeycloakService } from '../../../Keyclock.service';


@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  private baseUrl = 'http://localhost:8081/medecins';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  // Obtenir l'en-tête d'autorisation avec le token JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloakService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter un médecin sans secrétaire
  creerMedecinsSansSecretaire(medecinDto: Medecin): Observable<Medecin> {
    const headers = this.getAuthHeaders();
    return this.http.post<Medecin>(`${this.baseUrl}/creerSansSecretaire`, medecinDto, { headers });
  }

  // Obtenir tous les médecins
  getAllMedecins(): Observable<Medecin[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Medecin[]>(`${this.baseUrl}/getAllMedecins`, { headers });
  }

  // Obtenir un médecin par ID
  getMedecinById(id: number): Observable<Medecin> {
    const headers = this.getAuthHeaders();
    return this.http.get<Medecin>(`${this.baseUrl}/getMedecin/${id}`, { headers });
  }

  // Mettre à jour un médecin
  updateMedecin(medecinDto: Medecin): Observable<Medecin> {
    const headers = this.getAuthHeaders();
    return this.http.put<Medecin>(`${this.baseUrl}/updateMedecin/${medecinDto.id}`, medecinDto, { headers });
  }

  // Supprimer un médecin
  deleteMedecin(id: number): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.delete<string>(`${this.baseUrl}/deleteMedecin/${id}`, { headers });
  }

  // Assigner une secrétaire à un médecin
  assignSecretaireToMedecin(medecinId: number, secretaireId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/assignSecretaire/${medecinId}/${secretaireId}`, {}, { headers });
  }
}