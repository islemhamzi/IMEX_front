import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMesDocumentsComponent } from './consulter-mes-documents.component';

describe('ConsulterMesDocumentsComponent', () => {
  let component: ConsulterMesDocumentsComponent;
  let fixture: ComponentFixture<ConsulterMesDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterMesDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterMesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
