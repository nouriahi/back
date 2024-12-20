
import { Component } from '@angular/core';

import { APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from '../../Keyclock.service';
import { KeycloakAngularModule } from 'keycloak-angular';

export function initializeKeycloak(keycloakService: KeycloakService) {
  return (): Promise<void> => keycloakService.init();
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KeycloakAngularModule, RouterModule],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {title = 'frontClinique';}

