import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResenaComponent } from './add-resena.component';

describe('AddResenaComponent', () => {
  let component: AddResenaComponent;
  let fixture: ComponentFixture<AddResenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
