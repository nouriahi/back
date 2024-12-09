import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Le composant racine de votre application
import { appConfig } from './app/app.config'; // Votre configuration centralisée

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
