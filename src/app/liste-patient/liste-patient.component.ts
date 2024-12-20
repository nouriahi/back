import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-liste-patient',
  standalone: true,
  imports: [],
  templateUrl: './liste-patient.component.html',
  styleUrl: './liste-patient.component.css'
})

export class ListePatientComponent  implements OnInit {
  patients: Patient[] = [];


  constructor() { }

  ngOnInit(): void {
    
  }

 
  
}

