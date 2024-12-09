import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AjoutMedecinComponent } from './ajout-medecin/ajout-medecin.component';
import { AjoutSecretaireComponent } from './ajout-secretaire/ajout-secretaire.component';
import { MedecinListComponent } from './medecin-list/medecin-list.component';
import { SecretaireListComponent } from './secretaire-list/secretaire-list.component';
import { UpdateMedecinComponent } from './update-medecin/update-medecin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditSecretaireComponent } from './update-secretaire/update-secretaire.component';
import { AffecterSecretaireComponent } from './affecter-secretaire/affecter-secretaire.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ajout-medecin', component: AjoutMedecinComponent },
  { path: 'secretaire-list', component: SecretaireListComponent },
  { path: 'ajout-secretaire', component: AjoutSecretaireComponent },
  { path: 'liste_Medecin', component: MedecinListComponent },
  { path: 'admin', component: DashboardComponent },
  { path:'assign-secretaire/:id',component:AffecterSecretaireComponent},
  { path: 'update-medecin/:id', component:UpdateMedecinComponent  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'secretaire-edit/:id', component: EditSecretaireComponent },
  
  

];
