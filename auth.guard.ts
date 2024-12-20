import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from './Keyclock.service';




@Injectable({
    providedIn: 'root', // Assurez-vous qu'il est déclaré comme service global
  })
  export class AuthGuard implements CanActivate {
    constructor(
      private keycloakService: KeycloakService,
      private router: Router
    ) {}
  
    async canActivate(): Promise<boolean> {
      try {
        const isAuthenticated = await this.keycloakService.isAuthenticated();
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/access-denied']);
          return false;
        }
      } catch (error) {
        console.error('Erreur d’authentification Keycloak :', error);
        this.router.navigate(['/access-denied']);
        return false;
      }
    }
  }
  