import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from '../models/medecin.model';
import { MedecinCreationDto } from '../models/medecin-creation-dto.model';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  private baseUrl = 'http://localhost:8081/medecins';

  constructor(private http: HttpClient) {}

  // Ajouter un médecin sans secrétaire
  creerMedecinsSansSecretaire(medecinDto: Medecin): Observable<Medecin> {
    return this.http.post<Medecin>(`${this.baseUrl}/creerSansSecretaire`, medecinDto);
  }

  // Obtenir tous les médecins
  getAllMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.baseUrl}/getAllMedecins`);
  }

  // Obtenir un médecin par ID
  getMedecinById(id: number): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.baseUrl}/getMedecin/${id}`);
  }

  // Mettre à jour un médecin
  updateMedecin(medecinDto: Medecin): Observable<Medecin> {
    return this.http.put<Medecin>(`${this.baseUrl}/updateMedecin/${medecinDto.id}`, medecinDto);
  }

  // Supprimer un médecin
  deleteMedecin(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deleteMedecin/${id}`);
  }

  // Assigner une secrétaire à un médecin
 assignSecretaireToMedecin(medecinId: number, secretaireId: number): Observable<any> {
    // Utilisation de la bonne URL avec PUT et path variables dans l'URL
    return this.http.put(`${this.baseUrl}/assignSecretaire/${medecinId}/${secretaireId}`, {});
  }
   
    
    
  
}
