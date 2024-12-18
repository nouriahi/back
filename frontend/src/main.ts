import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService } from './app/keycloak.service';

export function initializeKeycloak(keycloakService: KeycloakService) {
  console.log('Initializing Keycloak...');
  return (): Promise<void> => keycloakService.init();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true,
    },
    KeycloakService,
  ],
}).catch((err) => console.error('Bootstrap error:', err));
