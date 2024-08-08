import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalActiviteComponent } from './journal-activite.component';

describe('JournalActiviteComponent', () => {
  let component: JournalActiviteComponent;
  let fixture: ComponentFixture<JournalActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalActiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
