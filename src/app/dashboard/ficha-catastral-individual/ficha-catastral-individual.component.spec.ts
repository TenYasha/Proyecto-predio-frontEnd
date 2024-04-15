import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaCatastralIndividualComponent } from './ficha-catastral-individual.component';

describe('FichaCatastralIndividualComponent', () => {
  let component: FichaCatastralIndividualComponent;
  let fixture: ComponentFixture<FichaCatastralIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaCatastralIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaCatastralIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
