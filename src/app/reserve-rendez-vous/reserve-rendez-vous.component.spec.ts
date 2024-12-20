import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveRendezVousComponent } from './reserve-rendez-vous.component';

describe('ReserveRendezVousComponent', () => {
  let component: ReserveRendezVousComponent;
  let fixture: ComponentFixture<ReserveRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveRendezVousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserveRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
