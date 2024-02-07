import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCentroComponent } from './edit-centro.component';

describe('EditCentroComponent', () => {
  let component: EditCentroComponent;
  let fixture: ComponentFixture<EditCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCentroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
