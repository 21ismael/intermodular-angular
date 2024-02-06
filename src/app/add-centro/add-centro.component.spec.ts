import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentroComponent } from './add-centro.component';

describe('AddCentroComponent', () => {
  let component: AddCentroComponent;
  let fixture: ComponentFixture<AddCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCentroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
