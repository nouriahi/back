import { Component } from '@angular/core';
import { KeycloakService } from './keycloak.service';
import { KeycloakAngularModule } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
export function initializeKeycloak(keycloakService: KeycloakService) {
  return (): Promise<void> => keycloakService.init();
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KeycloakAngularModule, RouterModule],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
