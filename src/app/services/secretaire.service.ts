import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Secretaire } from '../models/secretaire.model';


@Injectable({
  providedIn: 'root',
})
export class SecretaireService {
  private apiUrl = 'http://localhost:8082/secretaire'; 

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter un secrétaire
  ajouterSecretaire(secretaire: Secretaire): Observable<Secretaire> {
    return this.http.post<Secretaire>(`${this.apiUrl}/ajouterSecretaire`, secretaire);
  }

  // Méthode pour obtenir tous les secrétaires
  getAllSecretaires(): Observable<Secretaire[]> {
    return this.http.get<Secretaire[]>(`${this.apiUrl}/listeSecretaires`);
  }

  // Méthode pour obtenir un secrétaire par ID
  getSecretaireById(id: number): Observable<Secretaire> {
    return this.http.get<Secretaire>(`${this.apiUrl}/getSecretaire/${id}`);
  }

  // Méthode pour mettre à jour un secrétaire
 /* updateSecretaire(id: number, secretaire: Secretaire): Observable<Secretaire> {
    return this.http.put<Secretaire>(`${this.apiUrl}/updateSecretaire/${id}`, secretaire);
  }*/
    updateSecretaire(secretaire: Secretaire): Observable<Secretaire> {
      return this.http.put<Secretaire>(`${this.apiUrl}/updateSecretaire/${secretaire.id}`, secretaire);
    }
    

  // Méthode pour supprimer un secrétaire
deleteSecretaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteSecretaire/${id}`);
  }
 
  // Méthode pour supprimer un secrétaire
  
  
}  
  
