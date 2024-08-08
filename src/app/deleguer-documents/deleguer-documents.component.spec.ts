import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleguerDocumentsComponent } from './deleguer-documents.component';

describe('DeleguerDocumentsComponent', () => {
  let component: DeleguerDocumentsComponent;
  let fixture: ComponentFixture<DeleguerDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleguerDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleguerDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
