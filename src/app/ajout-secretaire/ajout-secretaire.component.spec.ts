import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSecretaireComponent } from './ajout-secretaire.component';

describe('AjoutSecretaireComponent', () => {
  let component: AjoutSecretaireComponent;
  let fixture: ComponentFixture<AjoutSecretaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSecretaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
