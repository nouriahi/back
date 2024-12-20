import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js'; // Importation correcte de Keycloak

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloakInstance!: Keycloak.KeycloakInstance;

  constructor() {}

  async init(): Promise<void> {
    if (typeof window !== 'undefined' && window.document) {
      // Utilisez `new Keycloak(...)` pour créer une nouvelle instance
      this.keycloakInstance = new Keycloak({
        url: 'http://localhost:8081',
        realm: 'projet-realm',
        clientId: 'backend1',
      });

      try {
        await this.keycloakInstance.init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        });
        console.log('Keycloak service initialized successfully');
      } catch (error) {
        console.error('Keycloak initialization failed:', error);
      }
    } else {
      console.warn('Keycloak cannot be initialized in this environment');
    }
  }

  // Vérifier si l'utilisateur est authentifié
  async isAuthenticated(): Promise<boolean> {
    return this.keycloakInstance?.authenticated || false;
  }

  // Obtenir le token
  getToken(): string | null {
    return this.keycloakInstance?.token || null;
  }

  // Déconnexion
  async logout(): Promise<void> {
    await this.keycloakInstance.logout();
  }
}