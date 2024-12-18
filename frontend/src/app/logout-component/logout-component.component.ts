import { Component } from '@angular/core';
import { KeycloakService } from '../keycloak.service'; 
@Component({
  selector: 'app-logout',
  template: `<p>Déconnexion en cours...</p>`
})
export class LogoutComponent {
  constructor(private keycloakService: KeycloakService) {
    this.keycloakService.logout();
  }
}
