//src\app\gestion-des-utilisateurs\gestion-des-utilisateurs.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesUtilisateursComponent } from './gestion-des-utilisateurs.component';

describe('GestionDesUtilisateursComponent', () => {
  let component: GestionDesUtilisateursComponent;
  let fixture: ComponentFixture<GestionDesUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesUtilisateursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
