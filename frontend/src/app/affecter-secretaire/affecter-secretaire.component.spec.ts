import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterSecretaireComponent } from './affecter-secretaire.component';

describe('AffecterSecretaireComponent', () => {
  let component: AffecterSecretaireComponent;
  let fixture: ComponentFixture<AffecterSecretaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffecterSecretaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffecterSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
