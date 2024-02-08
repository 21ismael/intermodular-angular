import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormularioComponent } from './add-formulario.component';

describe('AddFormularioComponent', () => {
  let component: AddFormularioComponent;
  let fixture: ComponentFixture<AddFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
